const cls = 'modal-body'

const modalBody = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
  }
}

export default modalBody
