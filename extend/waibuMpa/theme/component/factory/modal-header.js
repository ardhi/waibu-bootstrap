const cls = 'modal-header'

async function modalHeader () {
  return class ModalHeader extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default modalHeader
