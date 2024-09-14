const cls = 'breadcrumb-item'

const breadcrumbItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'li', cls })
    if (params.attr.href) {
      params.html = `<a href="${params.attr.href}">${params.html}</a>`
    }
  }
}

export default breadcrumbItem
