const cls = 'breadcrumb-item'

const breadcrumbItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'li', cls })
  }
}

export default breadcrumbItem
