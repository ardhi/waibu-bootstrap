import { colors, parseVariant } from '../method/after-build-tag/_lib.js'
const cls = 'table'

async function td (component) {
  return class Td extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} td`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.color) this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.color, values: colors }))
    }
  }
}

export default td
