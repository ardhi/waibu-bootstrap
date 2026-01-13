const cls = 'blockquote'

async function blockquote () {
  return class Blockquote extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    build = async () => {
      const { isString } = this.app.lib._
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
