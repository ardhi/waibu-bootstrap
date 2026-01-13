const cls = 'navbar-brand'

async function navbarBrand () {
  return class NavbarBrand extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      const { isString } = this.app.lib._
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'a'
      this.component.normalizeAttr(this.params, { tag, cls })
      if (this.params.tag === 'a' && !this.params.attr.href) this.params.attr.href = '#'
    }
  }
}

export default navbarBrand
