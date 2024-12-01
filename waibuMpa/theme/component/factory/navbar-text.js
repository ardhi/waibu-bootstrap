const cls = 'navbar-text'

async function navbarText () {
  return class NavbarText extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'span', cls })
    }
  }
}

export default navbarText
