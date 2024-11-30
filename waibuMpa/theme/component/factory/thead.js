const cls = 'table'

async function thead (component) {
  return class Thead extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} thead`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.divider) this.params.attr.class.push(`${cls}-group-divider`)
    }
  }
}

export default thead
