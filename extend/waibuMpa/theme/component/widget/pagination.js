import { sizes, parseSimple } from '../method/after-build-tag/_lib.js'
const cls = 'pagination'

async function pagination () {
  return class Pagination extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'ul', cls })
    }

    build = async () => {
      const { isString } = this.app.lib._
      if (!this.params.attr.margin) this.params.attr.margin = 'bottom-0'
      if (this.params.attr.size) this.params.attr.class.push(parseSimple.call(this, { cls, value: this.params.attr.size, values: sizes }))
      this.params.prepend = `<nav${isString(this.params.attr.label) ? ` aria-label="${this.params.attr.label}"` : ''}>`
      this.params.append = '</nav>'
    }
  }
}

export default pagination
