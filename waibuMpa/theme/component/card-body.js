const cls = 'card-body'

const cardBody = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
  }
}

export default cardBody
