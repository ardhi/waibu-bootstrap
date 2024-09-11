const cls = 'page-item'

const paginationItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'li', cls })
    const attr = { class: 'page-link', href: params.attr.href ?? '#' }
    const tag = params.attr.active || params.attr.disabled ? 'span' : 'a'
    if (params.attr.active || params.attr.disabled) delete attr.href
    params.html = await this._render({ tag, attr, html: params.html, req: params.req, reply: params.reply })
    if (params.attr.active) params.attr.active = 'page'
  }
}

export default paginationItem
