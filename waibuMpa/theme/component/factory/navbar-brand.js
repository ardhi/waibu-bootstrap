const cls = 'navbar-brand'

async function navbarBrand (component) {
  return class NavbarBrand extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      const { isString } = this.plugin.app.bajo.lib._
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'a'
      this.component.normalizeAttr(this.params, { tag, cls })
      if (this.params.tag === 'a' && !this.params.attr.href) this.params.attr.href = '#'
    }
  }
}

export default navbarBrand
