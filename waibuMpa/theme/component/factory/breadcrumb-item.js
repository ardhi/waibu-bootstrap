const cls = 'breadcrumb-item'

async function breadcrumbItem () {
  return class BreadcrumbItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'li', cls })
    }

    async build () {
      const { omit } = this.plugin.app.bajo.lib._
      const { attrToArray } = this.plugin.app.waibuMpa
      if (this.params.attr.href) {
        if (this.params.attr.hrefRebuild) {
          this.params.attr.hrefRebuild = attrToArray(this.params.attr.hrefRebuild)
          const [path, ...exclude] = this.params.attr.hrefRebuild
          this.params.attr.href = this.component.buildUrl({ exclude, base: path })
        }
        this.params.html = `<a href="${this.params.attr.href}">${this.params.html}</a>`
      }
      this.params.attr = omit(this.params.attr, ['href', 'hrefRebuild'])
    }
  }
}

export default breadcrumbItem
