const cls = 'card-text'

async function cardBody () {
  return class CardBody extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      const { isString } = this.app.lib._
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'p'
      this.component.normalizeAttr(this.params, { tag, cls })
    }
  }
}

export default cardBody
