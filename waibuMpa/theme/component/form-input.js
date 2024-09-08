import { buildFormHint, buildFormLabel, buildFormInput } from './_lib.js'
import { sizes } from './_after-build-tag/_lib.js'

export async function handleInput ({ handler, attr, params } = {}) {
  const { trim, filter, has, omit, pull, find } = this.plugin.app.bajo.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  const me = this
  const addons = []
  const isLabel = has(params.attr, 'label')
  const isLabelFloating = attr.label.floating && isLabel
  if (isLabelFloating) {
    attr.wrapper.class.push('form-floating')
    attr._.placeholder = attr._.label
    attr._ = omit(attr._, ['rows'])
  }
  this.$(`<div>${trim(params.html ?? '')}</div>`).find('[addon]').each(function () {
    const position = this.attribs.addon
    const html = trim(me.$(this).html())
    addons.push({ position, html })
  })
  const result = {
    prepend: [],
    append: [],
    input: await handler.call(this, attr, params.html)
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
  if (!isLabelFloating && isLabel) contents.push(await buildFormLabel.call(this, attr))
  if (result.prepend.length === 0 && result.append.length === 0) {
    contents.push(result.input)
  } else if (isLabelFloating) {
    pull(attr.wrapper.class, 'form-floating')
    attr.wrapper.class.push('input-group')
    if (attr._.size && sizes.includes(attr._.size)) attr.wrapper.class.push(`input-group-${attr._.size}`)
    const _attr = { class: ['form-floating'] }
    const html = []
    const label = await buildFormLabel.call(this, attr)
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(await this._render('div', { params: { attr: _attr, html: `${result.input}\n${label}` } }))
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(html.join('\n'))
  } else {
    const _attr = { class: ['input-group'] }
    if (attr._.size && sizes.includes(attr._.size)) _attr.class.push(`input-group-${attr._.size}`)
    const html = []
    if (result.prepend.length > 0) html.push(result.prepend.join('\n'))
    html.push(result.input)
    if (result.append.length > 0) html.push(result.append.join('\n'))
    contents.push(await this._render({ tag: 'div', attr: _attr, html: html.join('\n') }))
  }
  if (params.attr.hint) contents.push(await buildFormHint.call(this, attr))
  return contents
}

export async function build (handler, params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { groupAttrs } = this.plugin.app.waibuMpa

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  attr._.type = attr._.type ?? 'text'
  const contents = await handleInput.call(this, { handler, params, attr })
  let datalist

  if (attr._.datalist && !['password', 'file', 'checkbox', 'radio'].includes(attr._.type)) {
    datalist = attr._.datalist
    attr._.list = generateId()
    const args = { tag: 'datalist', attr: { id: attr._.list, options: datalist }, html: '', reply: params.reply, req: params.req }
    const cmp = await this.buildTag(args)
    contents.push(cmp)
  }
  if (params.attr.wrapper === 'none') params.noTag = true
  else {
    params.attr = attr.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
}

async function formInput (params = {}) {
  await build.call(this, buildFormInput, params)
}

export default formInput
