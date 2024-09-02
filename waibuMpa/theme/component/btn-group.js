import { parseSimple, sizes } from './_after-build-tag/_lib.js'

const cls = 'btn-group'

const btnGroup = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'group'
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    if (has(params.attr, 'label')) params.attr['aria-label'] = params.attr.label
    delete params.attr.label
  }
}

export default btnGroup
