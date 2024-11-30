const cls = 'collapse'

async function collapseItem (component) {
  return class CollapseItem extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, autoId: true })
      if (this.params.attr.showOnStart) this.params.attr.class.push('show')
    }
  }
}

export default collapseItem
