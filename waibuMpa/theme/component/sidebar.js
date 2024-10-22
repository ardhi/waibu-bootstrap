async function sidebar (params = {}) {
  const { omit } = this.plugin.app.bajo.lib._
  this._normalizeAttr(params, { tag: 'div', flex: 'column shrink:0' })
  params.attr.margin = params.attr.margin ?? 'all-3'
  params.attr.style.position = 'fixed'
  params.attr.style.top = 0
  params.attr.style.bottom = 0
  if (params.attr.side === 'end') params.attr.style.right = 0
  else params.attr.style.left = 0
  params.attr.dim = 'height:viewport'
  if (params.attr.mini) {
    params.attr.style.width = params.attr.style.width ?? '3.5rem'
    params.attr.margin = 'all-0'
  } else {
    params.attr.style.width = params.attr.style.width ?? '280px'
  }
  params.attr = omit(params.attr, ['width', 'side'])
}

export default sidebar
