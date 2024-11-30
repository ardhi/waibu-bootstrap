const cls = 'modal-body'

async function modalBody (component) {
  return class ModalBody extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default modalBody
