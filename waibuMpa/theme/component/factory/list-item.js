const inlineClass = 'list-inline-item'

async function listItem () {
  return class ListItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'li' })
    }

    build = async () => {
      const { isString } = this.plugin.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['badge'])
      this.params.attr = group._
      if (this.params.attr.inline) this.params.attr.class.push(inlineClass)
      if (this.params.attr.color) this.params.attr.childColor = this.params.attr.color
      if (group.badge) {
        const badge = await this.component.buildTag({ tag: 'badge', attr: group.badge, html: this.params.attr.badge })
        this.params.html += ' ' + badge
      }
      if (isString(this.params.attr.target) && !this.params.attr.href) this.params.attr.href = '#'
      if (this.params.attr.href) {
        const attr = this.params.attr
        const html = this.params.html
        if (isString(this.params.attr.target)) {
          const [id, toggle = 'modal'] = this.params.attr.target.split(':')
          attr.dataBsTarget = `#${id}`
          attr.dataBsToggle = toggle
        }
        if (html.includes('<i class="')) attr.class.push('icon-link')
        this.params.html = await this.component.render({ tag: 'a', attr, html })
      }
      delete this.params.attr.target
    }
  }
}

export default listItem
