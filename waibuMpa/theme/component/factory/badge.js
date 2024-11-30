const cls = 'badge'

async function badge (component) {
  return class Badge extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'span' })
    }

    async build () {
      const { isString, omit } = this.plugin.app.bajo.lib._
      if (isString(this.params.attr.alt)) this.params.html += `<span class="visually-hidden">${this.params.attr.alt}</span>`
      if (this.params.attr.dot) {
        this.params.attr.class.push('p-2')
        this.params.html = ''
      } else this.params.attr.class.push(cls)

      this.params.attr = omit(this.params.attr, ['alt', 'dot'])
    }
  }
}

export default badge
