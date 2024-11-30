const cls = 'card-title'

async function cardTitle (component) {
  return class CardTitle extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'h5', cls })
    }
  }
}

export default cardTitle
