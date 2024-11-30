import { buildFormHint, buildFormLabel, buildFormCheck } from './_lib.js'

export async function build (handler, params = {}) {
  const { isEmpty, get, find } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this.component.normalizeAttr(this.params)
  if (!this.params.attr.label && this.params.attr.name) this.params.attr.label = this.component.req.t(`field.${this.params.attr.name}`)
  if (this.params.attr.noLabel) this.params.attr.label = undefined
  const group = groupAttrs(this.params.attr, ['label', 'hint', 'wrapper', 'col'], false)
  const contents = []
  group._.id = this.params.attr.id ?? this.plugin.app.bajo.generateId()
  if (!isEmpty(group._.label)) {
    group.wrapper.class.push('form-check')
    if (group.wrapper.inline) group.wrapper.class.push('form-check-inline')
    else if (group.wrapper.reverse) group.wrapper.class.push('form-check-reverse')
  }

  let input = await handler.call(this, group, this.params)
  const label = this.params.attr.label ? (await buildFormLabel.call(this, group, undefined, 'form-check-label')) : ''
  if (group._.name) {
    const details = get(this, 'locals.error.details', [])
    const err = find(details, { field: group._.name })
    if (err) {
      const ext = err.ext ?? {}
      input = this.component.$(input).addClass('is-invalid').prop('outerHTML')
      input += `\n${label}`
      input += `\n<div class="invalid-feedback">${this.component.req.t(ext.type ? `validation.${ext.type}` : err.error, ext.context)}</div>`
    } else input += `\n${label}`
  } else input += `\n${label}`
  contents.push(input)
  if (this.params.attr.hint) contents.push(await buildFormHint.call(this, group))
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

async function formCheck (component) {
  return class FormCheck extends component.baseFactory {
    async build () {
      await build.call(this, buildFormCheck, this.params)
    }
  }
}

export default formCheck
