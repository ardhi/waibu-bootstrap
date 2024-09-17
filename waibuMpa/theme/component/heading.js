async function heading (params = {}) {
  params.attr.type = params.attr.type ?? '1'
  let [type, display] = params.attr.type.split('-')
  if (display && display !== 'display') display = undefined
  const tag = display ? 'h1' : ('h' + type)
  this._normalizeAttr(params, { tag })
  if (params.attr.tag && !display) {
    params.attr.class.push('h' + type)
    params.tag = params.attr.tag
  }
  if (display) params.attr.class.push(`display-${type}`)
  delete params.attr.type
}

export default heading
