const cls = 'card-subtitle'

async function cardSubtitle () {
  return class CardSubtitle extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'h6', cls: [cls, 'mb-2'] })
      if (!this.params.attr.text) this.params.attr.class.push('text-body-secondary')
    }
  }
}

export default cardSubtitle
