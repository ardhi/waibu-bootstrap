import { sizes, parseSimple } from './_after-build-tag/_lib.js'
const cls = 'pagination'

const pagination = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { tag: 'ul', cls })
    if (params.attr.size) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    params.prepend = `<nav${isString(params.attr.label ? ` aria-label="${params.attr.label}"` : '')}>`
    params.append = '</nav>'
  }
}

export default pagination
