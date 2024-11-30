const cls = 'modal-footer'

async function modalFooter (component) {
  return class ModalFooter extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default modalFooter
