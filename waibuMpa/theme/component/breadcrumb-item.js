const cls = 'breadcrumb-item'

const breadcrumbItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit } = this.plugin.app.bajo.lib._
    const { attrToArray } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'li', cls })
    if (params.attr.href) {
      if (params.attr.hrefRebuild) {
        params.attr.hrefRebuild = attrToArray(params.attr.hrefRebuild)
        const [path, ...exclude] = params.attr.hrefRebuild
        params.attr.href = this._buildUrl({ exclude, url: path })
      }
      params.html = `<a href="${params.attr.href}">${params.html}</a>`
    }
    params.attr = omit(params.attr, ['href', 'hrefRebuild'])
  }
}

export default breadcrumbItem
