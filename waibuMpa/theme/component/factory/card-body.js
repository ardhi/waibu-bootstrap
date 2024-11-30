const cls = 'card-body'

async function cardBody (component) {
  return class CardBody extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default cardBody
