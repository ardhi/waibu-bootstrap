const inlineClass = 'list-inline-item'

const listItem = {
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'li' })
    const group = groupAttrs(params.attr, ['badge'])
    params.attr = group._
    if (params.attr.inline) params.attr.class.push(inlineClass)
    if (params.attr.color) params.attr.childColor = params.attr.color
    if (group.badge) {
      const badge = await this.buildTag({ tag: 'badge', attr: group.badge, html: params.attr.badge })
      params.html += ' ' + badge
    }
    if (isString(params.attr.target) && !params.attr.href) params.attr.href = '#'
    if (params.attr.href) {
      const attr = { href: params.attr.href, class: [] }
      const html = params.html
      if (isString(params.attr.target)) {
        const [id, toggle = 'modal'] = params.attr.target.split(':')
        attr.dataBsTarget = `#${id}`
        attr.dataBsToggle = toggle
      }
      if (html.includes('<i class="')) attr.class.push('icon-link')
      params.html = await this._render({ tag: 'a', attr, html })
    }
    delete params.attr.target
  }
}

export default listItem
