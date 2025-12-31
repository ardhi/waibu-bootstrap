const cls = 'card-group'

async function cardGroup () {
  return class CardGroup extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default cardGroup
