const cls = 'card-title'

async function cardTitle () {
  return class CardTitle extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'h5', cls })
    }
  }
}

export default cardTitle
