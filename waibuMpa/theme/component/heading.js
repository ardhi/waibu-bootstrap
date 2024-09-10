async function heading (params = {}) {
  const type = params.attr.type ?? '1'
  const tag = 'h' + type
  this._normalizeAttr(params, { tag })
  if (params.attr.tag) {
    params.attr.class.push('h' + type)
    params.tag = params.attr.tag
  }
  delete params.attr.type
}

export default heading
