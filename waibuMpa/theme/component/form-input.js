import { buildFormHint, buildFormLabel, buildFormInput } from './_lib.js'
import { sizes } from './_after-build-tag/_lib.js'

export async function handleInput ({ handler, group, params } = {}) {
  const { trim, filter, has, omit, pull, find, get } = this.plugin.app.bajo.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  const me = this
  const addons = []
  const isLabel = has(params.attr, 'label')
  const isLabelFloating = group.label && group.label.floating && isLabel
  if (isLabelFloating) {
    group.wrapper.class.push('form-floating')
    group._.placeholder = group._.label
    group._ = omit(group._, ['rows'])
  }
  this.$(`<div>${trim(params.html ?? '')}</div>`).find('[addon]').each(function () {
    const position = this.attribs.addon
    const html = trim(me.$(this).html())
    addons.push({ position, html })
  })
  const result = {
    prepend: [],
    append: [],
    input: await handler.call(this, group, params)
  }
  if (group._.name) {
    const details = get(this, 'locals.error.details', [])
    const err = find(details, { field: group._.name })
    if (err) {
      const ext = err.ext ?? {}
      result.input = this.$(result.input).addClass('is-invalid').prop('outerHTML')
      result.input += `\n<div class="invalid-feedback">${this.req.t(ext.type ? `validation.${ext.type}` : err.error, ext.context)}</div>`
    }
  }
  const el = {
    prepend: filter(addons, { position: 'prepend' }),
    append: filter(addons, { position: 'append' })
  }
  for (const pos of ['prepend', 'append']) {
    for (const i of el[pos]) {
      const html = `<div class="input-group-text">${i.html}</div>`
      this.$(html).each(function () {
        const parent = this
        let isBtn = false
        me.$(parent).children().each(function () {
          if (this.name === 'input' && ['checkbox', 'radio'].includes(this.attribs.type)) me.$(this).addClass('form-check-input')
          else if (this.name === 'button') {
            const hasCls = find(attrToArray(this.attribs.class ?? ''), c => c.includes('btn-'))
            if (!hasCls) me.$(this).addClass('btn btn-outline-secondary')
            isBtn = true
          }
        })
        result[pos].push(isBtn ? me.$(parent).html() : me.$(parent).prop('outerHTML'))
      })
    }
  }
  const contents = []
  if (!isLabelFloating && isLabel) contents.push(await buildFormLabel.call(this, group))
  const hint = params.attr.hint ? (await buildFormHint.call(this, group)) : ''

  if (isLabelFloating) {
    pull(group.wrapper.class, 'form-floating')
    group.wrapper.class.push('input-group')
    if (group._.size && sizes.includes(group._.size)) group.wrapper.class.push(`input-group-${group._.size}`)
    const _attr = { class: ['form-floating'] }
    const html = []
    const label = await buildFormLabel.call(this, group)
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(await this._render({ tag: 'div', attr: _attr, html: `${result.input}\n${label}\n${hint}` }))
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(html.join('\n'))
  } else {
    const _attr = { class: ['input-group'] }
    if (group._.size && sizes.includes(group._.size)) _attr.class.push(`input-group-${group._.size}`)
    const html = []
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(result.input)
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(await this._render({ tag: 'div', attr: _attr, html: html.join('\n') }), hint)
  }
  return contents
}

export async function build (handler, params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params, { autoId: true, type: params.attr.type ?? 'text' })
  if (!params.attr.label && params.attr.name) params.attr.label = this.req.t(`field.${params.attr.name}`)
  if (params.attr.noLabel) delete params.attr.label
  if (params.attr.type === 'search') {
    params.attr.ariaLabel = params.attr.placeholder ?? this.req.t('Search')
  }

  const group = groupAttrs(params.attr, ['label', 'hint', 'wrapper', 'col'], false)
  let datalist

  if (group._.datalist && !['password', 'file', 'checkbox', 'radio'].includes(group._.type)) {
    datalist = group._.datalist
    group._.list = generateId()
  }
  const contents = await handleInput.call(this, { handler, params, group })
  if (datalist) {
    const args = { tag: 'datalist', attr: { id: group._.list, options: datalist }, html: '' }
    const cmp = await this.buildTag(args)
    contents.push(cmp)
  }
  if (params.attr.noWrapper) params.noTag = true
  else {
    params.attr = group.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
  if (group._.col) {
    group.col.col = group._.col
    const grid = await this.buildTag({ tag: 'gridCol', attr: group.col, html: '\t' })
    const [prepend, append] = grid.split('\t')
    params.prepend = prepend
    params.append = append
  }
}

async function formInput (params = {}) {
  await build.call(this, buildFormInput, params)
}

export default formInput
