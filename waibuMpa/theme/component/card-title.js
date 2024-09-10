const cls = 'card-title'

const cardTitle = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'h5', cls })
  }
}

export default cardTitle
