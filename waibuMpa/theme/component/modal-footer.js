const cls = 'modal-footer'

const modalFooter = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
  }
}

export default modalFooter
