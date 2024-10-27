function formatSentence (item, params) {
  const { kebabCase, omit, merge } = this.plugin.app.bajo.lib._
  const cmp = kebabCase(item.component ?? 'navItem')
  const icon = item.icon
  const html = item.html ?? ''
  const attr = merge({ border: `side:${item.bottom ? 'top' : 'bottom'}`, rounded: 'width:0' }, omit(item, ['component', 'icon', 'ohref', 'html']))
  const result = [`<c:${cmp}`]
  for (const k in attr) {
    result.push(attr[k] === true ? k : `${k}="${attr[k]}"`)
    if (k.endsWith('tooltip')) result.push(`tooltip-placement="${params.attr.side === 'end' ? 'left' : 'right'}"`)
    if (k === 'dropdown' && !cmp.includes('dropdown')) {
      result.push('dropdown-dir="end"')
    }
  }
  if (cmp.includes('dropdown')) result.push('dropdown-dir="end"')
  result.push(`><c:icon name="${icon}" style="font-size: 1.5rem;" />${html}</c:${cmp}>`)
  return result.join(' ')
}

async function sidebar (params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { omit, filter } = this.plugin.app.bajo.lib._
  this._normalizeAttr(params, { tag: 'div', flex: 'column shrink:0' })
  params.attr.margin = params.attr.margin ?? 'all-3'
  params.attr.style.position = 'sticky'
  params.attr.style.top = 0
  params.attr.style['z-index'] = 1020
  if (params.attr.side === 'end') params.attr.style.right = 0
  else params.attr.style.left = 0
  params.attr.dim = 'height:viewport'
  params.attr.id = generateId('alpha')
  const html = []
  if (params.attr.mini) {
    params.attr.style.width = params.attr.style.width ?? '60px'
    params.attr.align = params.attr.align ?? 'center'
    params.attr.margin = 'all-0'
    if (params.attr.autoFill) {
      let items = filter(this.locals.sidebar ?? [], s => !s.bottom)
      if (items.length > 0) {
        html.push(`<c:nav tag="ul" flex="column" margin="bottom-auto" text="align:${params.attr.align}" type="pills">`)
        for (const item of items) {
          html.push(formatSentence.call(this, item, params))
        }
        html.push('</c:nav>')
      }
      items = filter(this.locals.sidebar ?? [], s => s.bottom)
      if (items.length > 0) {
        html.push(`<c:nav tag="ul" flex="column" text="align:${params.attr.align}" type="pills">`)
        for (const item of items) {
          html.push(formatSentence.call(this, item, params))
        }
        html.push('</c:nav>')
      }
    }
  } else {
    params.attr.style.width = params.attr.style.width ?? '280px'
  }
  params.html = await this.buildSentence(`<c:div dim="height:100" flex="column">\n${params.html}\n${html.join('\n')}\n</c:div>`)
  params.attr = omit(params.attr, ['width', 'side', 'mini', 'autoFill', 'align'])
}

export default sidebar
