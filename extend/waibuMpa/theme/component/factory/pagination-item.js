const cls = 'page-item'

async function paginationItem () {
  return class PaginationItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'li', cls })
    }

    build = async () => {
      const attr = { class: 'page-link', href: this.params.attr.href ?? '#' }
      const tag = this.params.attr.active || this.params.attr.disabled ? 'span' : 'a'
      if (this.params.attr.active || this.params.attr.disabled) delete attr.href
      this.params.html = await this.component.render({ tag, attr, html: this.params.html })
      if (this.params.attr.active) this.params.attr.active = 'page'
    }
  }
}

export default paginationItem
