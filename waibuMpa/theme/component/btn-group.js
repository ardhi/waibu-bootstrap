import { parseSimple, sizes } from './_after-build-tag/_lib.js'

const cls = 'btn-group'

const btnGroup = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'group'
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    if (isString(params.attr.label)) params.attr.ariaLabel = params.attr.label
    delete params.attr.label
  }
}

export default btnGroup
