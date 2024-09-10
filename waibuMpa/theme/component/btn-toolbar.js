const cls = 'btn-toolbar'

const btnToolbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls, role: 'toolbar' })
  }
}

export default btnToolbar
