async function a (params = {}) {
  this._normalizeAttr(params, { tag: 'a' })
  if (!params.attr.href) params.attr.href = '#'
  if (params.html.includes('<i class="')) params.attr.class.push('icon-link')
}

export default a
