const cls = 'card-group'

const cardGroup = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
  }
}

export default cardGroup
