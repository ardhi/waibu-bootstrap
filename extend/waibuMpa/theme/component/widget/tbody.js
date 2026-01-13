const cls = 'table'

async function tbody () {
  return class Tbody extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = `.${cls} tbody`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.divider) this.params.attr.class.push('table-group-divider')
    }
  }
}

export default tbody
