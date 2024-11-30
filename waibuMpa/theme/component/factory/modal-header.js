const cls = 'modal-header'

async function modalHeader (component) {
  return class ModalHeader extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default modalHeader
