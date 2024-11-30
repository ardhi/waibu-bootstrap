const cls = 'card-link'

async function cardLink (component) {
  return class CardLink extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'a', cls })
      if (!this.params.attr.href) this.params.attr.href = '#'
    }
  }
}

export default cardLink
