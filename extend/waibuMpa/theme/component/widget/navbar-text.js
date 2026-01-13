const cls = 'navbar-text'

async function navbarText () {
  return class NavbarText extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'span', cls })
    }
  }
}

export default navbarText
