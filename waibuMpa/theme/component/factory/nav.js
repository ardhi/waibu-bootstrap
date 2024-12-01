const cls = 'nav'
const types = ['tabs', 'pills', 'underline']

async function nav () {
  return class Nav extends this.baseFactory {
    constructor (options) {
      super(options)
      const { isString } = this.plugin.app.bajo.lib._
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'nav', cls })
      if (types.includes(this.params.attr.type)) this.params.attr.class.push(`nav-${this.params.attr.type}`)
      if (this.params.attr.fill) this.params.attr.class.push('nav-fill')
      if (isString(this.params.attr.tag)) this.params.tag = this.params.attr.tag
    }

    async build () {
      const { $ } = this.component
      if (!['ol', 'ul'].includes(this.params.tag)) {
        const html = []
        $(`<div>${this.params.html}</div>`).children().each(function () {
          html.push($(this).html())
        })
        this.params.html = html.join('\n')
      }
      delete this.params.attr.type
    }
  }
}

export default nav
