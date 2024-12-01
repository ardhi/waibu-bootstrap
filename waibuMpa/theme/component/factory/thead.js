const cls = 'table'

async function thead () {
  return class Thead extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `.${cls} thead`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.divider) this.params.attr.class.push(`${cls}-group-divider`)
    }
  }
}

export default thead
