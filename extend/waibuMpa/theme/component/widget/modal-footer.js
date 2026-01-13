const cls = 'modal-footer'

async function modalFooter () {
  return class ModalFooter extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }
  }
}

export default modalFooter
