import { colors, parseVariant } from '../method/after-build-tag/_lib.js'
const cls = 'table'

async function tr (component) {
  return class Tr extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} tr`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.color) this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.color, values: colors }))
    }
  }
}

export default tr
