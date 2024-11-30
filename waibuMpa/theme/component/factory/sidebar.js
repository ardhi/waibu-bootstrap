function formatSentence (item, params) {
  const { kebabCase, omit, merge } = this.plugin.app.bajo.lib._
  const cmp = kebabCase(item.component ?? 'navItem')
  const icon = item.icon
  const html = item.html ?? ''
  const attr = {}
  if (this.params.attr.divider) attr.border = `side:${item.bottom ? 'top' : 'bottom'}`
  if (this.params.attr.expanded) attr.rounded = 'width:0'
  merge(attr, omit(item, ['component', 'icon', 'ohref', 'html']))
  const result = [`<c:${cmp}`]
  for (const k in attr) {
    result.push(attr[k] === true ? k : `${k}="${attr[k]}"`)
    if (k.endsWith('tooltip')) result.push(`tooltip-placement="${this.params.attr.side === 'end' ? 'left' : 'right'}"`)
    if (k === 'dropdown' && !cmp.includes('dropdown')) {
      result.push('dropdown-dir="end"')
    }
  }
  if (cmp.includes('dropdown')) result.push('dropdown-dir="end"')
  if (this.params.attr.expanded) result.push(`><c:icon name="${icon}" style="font-size: 1.5rem" />${html}</c:${cmp}>`)
  else result.push(`><c:icon name="${icon}" />${html}</c:${cmp}>`)
  return result.join(' ')
}

async function sidebar (component) {
  return class Sidebar extends component.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'div', flex: 'column' })
    }

    async build () {
      const { generateId } = this.plugin.app.bajo
      const { omit, filter } = this.plugin.app.bajo.lib._
      this.params.attr.margin = this.params.attr.margin ?? 'all-3'
      this.params.attr.style.position = 'sticky'
      this.params.attr.style.top = 0
      this.params.attr.style['z-index'] = 1020
      if (this.params.attr.side === 'end') this.params.attr.style.right = 0
      else this.params.attr.style.left = 0
      this.params.attr.dim = 'height:viewport'
      this.params.attr.id = generateId('alpha')
      const html = []
      if (this.params.attr.mini) {
        this.params.attr.style.width = this.params.attr.style.width ?? '60px'
        this.params.attr.align = this.params.attr.align ?? 'center'
        this.params.attr.margin = 'all-0'
        if (this.params.attr.autoFill) {
          let items = filter(this.component.locals.sidebar ?? [], s => !s.bottom)
          if (items.length > 0) {
            html.push(`<c:nav tag="ul" flex="column" margin="bottom-auto" text="align:${this.params.attr.align}" type="pills" ${this.params.attr.expanded ? '' : 'padding="all-1"'}>`)
            for (const item of items) {
              html.push(formatSentence.call(this, item, this.params))
            }
            html.push('</c:nav>')
          }
          items = filter(this.component.locals.sidebar ?? [], s => s.bottom)
          if (items.length > 0) {
            html.push(`<c:nav tag="ul" flex="column" text="align:${this.params.attr.align}" type="pills" ${this.params.attr.expanded ? '' : 'padding="all-1"'}>`)
            for (const item of items) {
              html.push(formatSentence.call(this, item, this.params))
            }
            html.push('</c:nav>')
          }
        }
      } else {
        this.params.attr.style.width = this.params.attr.style.width ?? '280px'
      }
      this.params.html = await this.component.buildSentence(`<c:div dim="height:100" flex="column">\n${this.params.html}\n${html.join('\n')}\n</c:div>`)
      this.params.attr = omit(this.params.attr, ['width', 'side', 'mini', 'autoFill', 'align'])
    }
  }
}

export default sidebar
