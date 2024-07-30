const values = {
  variant: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link'],
  size: ['sm', 'md', 'lg']
}

function _getAttr (attr, type, cls) {
  let value = attr[type]
  value = (values[type] ?? []).includes(value) ? attr[type] : undefined
  if (value) attr.class.push(`${cls}-${value}`)
  delete attr[type]
}

export default _getAttr
