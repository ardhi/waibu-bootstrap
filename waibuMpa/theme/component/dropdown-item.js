const cls = 'dropdown-item'

const dropdownItem = {
  selector: `.dropdown-divider, .${cls}`,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'a' })
    if (params.attr.divider) {
      params.tag = 'hr'
      params.attr.class.push('dropdown-divider')
      params.selfClosing = true
      return
    }
    if (params.attr.header) {
      params.tag = 'h6'
      params.attr.class.push('dropdown-header')
      return
    }
    if (params.attr.disabled) {
      params.attr.class.push('disabled')
      delete params.attr.disabled
    }
    params.attr.class.push(cls)
  }
}

export default dropdownItem
