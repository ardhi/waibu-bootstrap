const cls = 'toast-container'

const toastStack = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
    params.attr.position = params.attr.position ?? 'fixed bottom-0 end-0'
    params.attr.margin = params.attr.marginn ?? 'all-2'
  }
}

export default toastStack
