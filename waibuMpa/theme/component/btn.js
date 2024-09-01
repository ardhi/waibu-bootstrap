import { parseVariant, parseSimple, sizes } from './_after-build-tag/_lib.js'

const cls = 'btn'
const variants = ['outline']

const btn = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has, isEmpty, omit } = this._
    const colors = this.getAttrValues.color
    params.attr.class.push(cls)
    // tag
    params.tag = has(params.attr, 'href') || params.attr.tag === 'a' ? 'a' : 'button'
    if (params.tag === 'button' && params.attr.href) delete params.attr.href
    if (params.tag === 'a' && isEmpty(params.attr.href)) params.attr.href = '#'
    if (params.tag === 'a') params.attr.role = 'button'
    if (params.tag === 'button' && !has(params.attr, 'type')) params.attr.type = 'button'

    if (has(params.attr, 'disabled') && params.tag === 'a') {
      params.attr.class.push('disabled')
      params.attr['aria-disabled'] = true
      params.attr['tab-index'] = -1
      params.attr = omit(params.attr, ['disabled', 'href'])
    }
    if (has(params.attr, 'toggle')) params.attr['data-bs-toggle'] = 'button'
    if (has(params.attr, 'active')) {
      params.attr.class.push('active')
      params.attr['aria-pressed'] = true
    }
    params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors, variants, prepend: true }))
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    params.attr = omit(params.attr, ['color', 'size', 'active', 'toggle'])
  }
}

export default btn
