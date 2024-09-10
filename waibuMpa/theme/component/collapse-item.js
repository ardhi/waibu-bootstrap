const cls = 'collapse'

const collapseItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    if (params.attr.showOnStart) params.attr.class.push('show')
  }
}

export default collapseItem
