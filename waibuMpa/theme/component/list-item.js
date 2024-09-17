const inlineClass = 'list-inline-item'

const listItem = {
  handler: async function (params = {}) {
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'li' })
    const group = groupAttrs(params.attr, ['badge'])
    params.attr = group._
    if (params.attr.inline) params.attr.class.push(inlineClass)
    if (params.attr.color) params.attr.childColor = params.attr.color
    if (group.badge) {
      const badge = await this.buildTag({ tag: 'badge', attr: group.badge, html: params.attr.badge, req: params.req, reply: params.reply })
      params.html += ' ' + badge
    }
  }
}

export default listItem
