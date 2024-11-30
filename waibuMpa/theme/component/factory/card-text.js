const cls = 'card-text'

async function cardBody (component) {
  return class CardBody extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      const { isString } = this.plugin.app.bajo.lib._
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'p'
      this.component.normalizeAttr(this.params, { tag, cls })
    }
  }
}

export default cardBody
