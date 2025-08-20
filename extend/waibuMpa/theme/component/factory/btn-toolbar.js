const cls = 'btn-toolbar'

async function btnToolbar () {
  return class BtnToolbar extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, role: 'toolbar' })
    }
  }
}

export default btnToolbar
