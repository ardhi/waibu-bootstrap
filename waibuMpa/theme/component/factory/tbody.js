const cls = 'table'

async function tbody (component) {
  return class Tbody extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} tbody`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.divider) this.params.attr.class.push('table-group-divider')
    }
  }
}

export default tbody
