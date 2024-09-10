import { parseSimple } from './_after-build-tag/_lib.js'
const cls = 'img'

const img = {
  selector: cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.responsive) params.attr.class.push(`${cls}-fluid`)
    if (params.attr.thumbnail) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.thumbnail, values: ['thumbnail'] }))
    if (params.attr.holder) params.attr.dataSrc = `holder.js/${params.attr.holder}`
    delete params.attr.holder
  }
}

export default img
