const cls = 'toast-container'

const toastStack = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls: [cls, 'position-static'] })
  }
}

export default toastStack
