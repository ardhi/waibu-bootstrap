const cls = 'modal-header'

const modalHeader = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
  }
}

export default modalHeader
