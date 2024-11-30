const cls = 'card-subtitle'

async function cardSubtitle (component) {
  return class CardSubtitle extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'h6', cls: [cls, 'mb-2', 'text-body-secondary'] })
    }
  }
}

export default cardSubtitle
