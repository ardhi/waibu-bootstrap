const cls = 'card-link'

const cardLink = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'a', cls })
    if (!params.attr.href) params.attr.href = '#'
  }
}

export default cardLink
