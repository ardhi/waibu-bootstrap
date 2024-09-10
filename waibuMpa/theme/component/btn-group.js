import { parseSimple, sizes } from './_after-build-tag/_lib.js'

const cls = 'btn-group'

const btnGroup = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls, role: 'group' })
    if (params.attr.size) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
  }
}

export default btnGroup
