const cls = 'blockquote'

async function blockquote (component) {
  return class Blockquote extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    async build () {
      const { isString } = this.plugin.app.bajo.lib._
      this.component.normalizeAttr(this.params, { cls })
      if (isString(this.params.attr.attribution)) {
        this.params.prepend = '<figure>'
        this.params.append = `<figcaption class="blockquote-footer">${this.params.attr.attribution}</figcaption></figure>`
        delete this.params.attr.attribution
      }
    }
  }
}

export default blockquote
