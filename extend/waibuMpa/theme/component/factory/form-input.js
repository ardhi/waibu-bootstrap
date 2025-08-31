import { buildFormHint, buildFormLabel, buildFormInput } from './_lib.js'
import { sizes } from '../method/after-build-tag/_lib.js'

export async function handleInput ({ handler, group, params } = {}) {
  const { trim, filter, has, omit, pull, find, get } = this.app.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  const { $ } = this.component
  const addons = []
  const isLabel = has(this.params.attr, 'label')
  const isLabelFloating = group.label && group.label.floating && isLabel
  if (isLabelFloating) {
    group.wrapper.class.push('form-floating')
    group._.placeholder = group._.label
    group._ = omit(group._, ['rows'])
  }
  $(`<div>${trim(this.params.html ?? '')}</div>`).find('[addon]').each(function () {
    const position = this.attribs.addon
    let html = trim($(this).html())
    const el = $(html)
    if (el.hasClass('dropdown')) html = el.prop('innerHTML')
    addons.push({ position, html })
  })
  const result = {
    prepend: [],
    append: [],
    input: await handler.call(this, group, this.params)
  }
  if (group._.name) {
    const details = get(this, 'component.locals.error.details', [])
    const err = find(details, { field: group._.name })
    if (err) {
      const ext = err.ext ?? {}
      result.input = $(result.input).addClass('is-invalid').prop('outerHTML')
      result.input += `\n<div class="invalid-feedback">${this.component.req.t(ext.type ? `validation.${ext.type}` : err.error, ext.context)}</div>`
    }
  }
  const el = {
    prepend: filter(addons, { position: 'prepend' }),
    append: filter(addons, { position: 'append' })
  }
  for (const pos of ['prepend', 'append']) {
    for (const i of el[pos]) {
      const html = `<div class="input-group-text">${i.html}</div>`
      $(html).each(function () {
        const parent = this
        let isBtn = false
        $(parent).children().each(function () {
          if (this.name === 'input' && ['checkbox', 'radio'].includes(this.attribs.type)) $(this).addClass('form-check-input')
          else if (this.name === 'button') {
            const hasCls = find(attrToArray(this.attribs.class ?? ''), c => c.includes('btn-'))
            if (!hasCls) $(this).addClass('btn btn-outline-secondary')
            isBtn = true
          }
        })
        result[pos].push(isBtn ? $(parent).html() : $(parent).prop('outerHTML'))
      })
    }
  }
  const contents = []
  if (!isLabelFloating && isLabel) contents.push(await buildFormLabel.call(this, group))
  const hint = this.params.attr.hint ? (await buildFormHint.call(this, group)) : ''

  if (isLabelFloating) {
    pull(group.wrapper.class, 'form-floating')
    group.wrapper.class.push('input-group')
    if (group._.size && sizes.includes(group._.size)) group.wrapper.class.push(`input-group-${group._.size}`)
    const _attr = { class: ['form-floating'] }
    const html = []
    const label = await buildFormLabel.call(this, group)
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(await this.component.render({ tag: 'div', attr: _attr, html: `${result.input}\n${label}\n${hint}` }))
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(html.join('\n'))
  } else {
    const _attr = { class: ['input-group'] }
    if (group._.size && sizes.includes(group._.size)) _attr.class.push(`input-group-${group._.size}`)
    const html = []
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(result.input)
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(await this.component.render({ tag: 'div', attr: _attr, html: html.join('\n') }), hint)
  }
  return contents
}

export async function build (handler, params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { groupAttrs } = this.plugin.app.waibuMpa
  this.component.normalizeAttr(this.params, { autoId: true, type: this.params.attr.type ?? 'text' })
  if (!this.params.attr.label && this.params.attr.name) this.params.attr.label = this.component.req.t(`field.${this.params.attr.name}`)
  if (this.params.attr.noLabel) delete this.params.attr.label
  if (this.params.attr.type === 'search') {
    this.params.attr.ariaLabel = this.params.attr.placeholder ?? this.component.req.t('Search')
  }

  const group = groupAttrs(this.params.attr, ['label', 'hint', 'wrapper', 'col'], false)
  if (group.label && group.label.floating && this.params.tag === 'formColor') group.label.style.top = '-1px'
  let datalist

  if (group._.datalist && !['password', 'file', 'checkbox', 'radio'].includes(group._.type)) {
    datalist = group._.datalist
    group._.list = generateId()
  }
  const contents = await handleInput.call(this, { handler, params, group })
  if (datalist) {
    const args = { tag: 'datalist', attr: { id: group._.list, options: datalist }, html: '' }
    const cmp = await this.component.buildTag(args)
    contents.push(cmp)
  }
  if (this.params.attr.noWrapper) this.params.noTag = true
  else {
    this.params.attr = group.wrapper
    this.params.tag = 'div'
  }
  this.params.html = contents.join('\n')
  if (group._.col) {
    group.col.col = group._.col
    const grid = await this.component.buildTag({ tag: 'gridCol', attr: group.col, html: '\t' })
    const [prepend, append] = grid.split('\t')
    this.params.prepend = prepend
    this.params.append = append
  }
}

async function formInput () {
  return class FormInput extends this.baseFactory {
    build = async () => {
      await build.call(this, buildFormInput, this.params)
    }
  }
}

export default formInput
