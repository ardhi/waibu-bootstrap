const cls = 'navbar-text'

const navbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'span', cls })
  }
}

export default navbar
