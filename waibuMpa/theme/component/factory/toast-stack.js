const cls = 'toast-container'

async function toastStack (component) {
  return class ToastStack extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
      this.params.attr.position = this.params.attr.position ?? 'fixed bottom-0 end-0'
      this.params.attr.margin = this.params.attr.margin ?? 'all-2'
    }
  }
}

export default toastStack
