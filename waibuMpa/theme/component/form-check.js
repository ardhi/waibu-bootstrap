import { buildFormHint, buildFormLabel, buildFormCheck } from './_lib.js'

export async function build (handler, params = {}) {
  const { isEmpty, get, find } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params)
  if (!params.attr.label && params.attr.name) params.attr.label = this.req.t(`field.${params.attr.name}`)
  if (params.attr.noLabel) params.attr.label = undefined
  const group = groupAttrs(params.attr, ['label', 'hint', 'wrapper', 'col'], false)
  const contents = []
  group._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  if (!isEmpty(group._.label)) {
    group.wrapper.class.push('form-check')
    if (group.wrapper.inline) group.wrapper.class.push('form-check-inline')
    else if (group.wrapper.reverse) group.wrapper.class.push('form-check-reverse')
  }

  let input = await handler.call(this, group, params)
  const label = params.attr.label ? (await buildFormLabel.call(this, group, undefined, 'form-check-label')) : ''
  if (group._.name) {
    const details = get(this, 'locals.error.details', [])
    const err = find(details, { field: group._.name })
    if (err) {
      const ext = err.ext ?? {}
      input = this.$(input).addClass('is-invalid').prop('outerHTML')
      input += `\n${label}`
      input += `\n<div class="invalid-feedback">${this.req.t(ext.type ? `validation.${ext.type}` : err.error, ext.context)}</div>`
    } else input += `\n${label}`
  } else input += `\n${label}`
  contents.push(input)
  if (params.attr.hint) contents.push(await buildFormHint.call(this, group))
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

async function formCheck (params = {}) {
  await build.call(this, buildFormCheck, params)
}

export default formCheck
