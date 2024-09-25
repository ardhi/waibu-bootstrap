import { buildFormHint, buildFormLabel, buildFormCheck } from './_lib.js'

export async function build (handler, params = {}) {
  const { isEmpty } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params)
  if (!params.attr.label && params.attr.name) params.attr.label = params.req.t(`field.${params.attr.name}`)
  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'], false)
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  if (!isEmpty(attr._.label)) {
    attr.wrapper.class.push('form-check')
    if (attr.wrapper.inline) attr.wrapper.class.push('form-check-inline')
    else if (attr.wrapper.reverse) attr.wrapper.class.push('form-check-reverse')
  }

  contents.push(await handler.call(this, attr, params))
  if (params.attr.label) contents.push(await buildFormLabel.call(this, attr, undefined, 'form-check-label'))
  if (params.attr.hint) contents.push(await buildFormHint.call(this, attr))
  if (params.attr.noWrapper) params.noTag = true
  else {
    params.attr = attr.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
}

async function formCheck (params = {}) {
  await build.call(this, buildFormCheck, params)
}

export default formCheck
