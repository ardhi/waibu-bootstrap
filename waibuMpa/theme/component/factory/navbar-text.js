const cls = 'navbar-text'

async function navbarText (component) {
  return class NavbarText extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'span', cls })
    }
  }
}

export default navbarText
