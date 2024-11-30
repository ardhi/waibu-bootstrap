const cls = 'btn-toolbar'

async function btnToolbar (component) {
  return class BtnToolbar extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, role: 'toolbar' })
    }
  }
}

export default btnToolbar
