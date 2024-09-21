import { colors, parseVariant } from './_after-build-tag/_lib.js'
const cls = 'table'

const tr = {
  selector: `.${cls} tr`,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.color) params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors }))
  }
}

export default tr
