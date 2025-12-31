const cls = 'card-link'

async function cardLink () {
  return class CardLink extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'a', cls })
      if (!this.params.attr.href) this.params.attr.href = '#'
    }
  }
}

export default cardLink
