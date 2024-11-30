const cls = 'table'

async function tfoot (component) {
  return class Tfoot extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} tfoot`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.divider) this.params.attr.class.push(`${cls}-group-divider`)
    }
  }
}

export default tfoot
