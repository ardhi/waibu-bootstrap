import { colors, parseVariant } from './_after-build-tag/_lib.js'
const cls = 'table'

const th = {
  selector: `.${cls} th`,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.color) params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors }))
  }
}

export default th
