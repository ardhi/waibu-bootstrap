const cls = 'dropdown-item'

const dropdownItem = {
  selector: `.dropdown-divider, .${cls}`,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'a'
    if (has(params.attr, 'divider')) {
      params.tag = 'hr'
      params.attr.class.push('dropdown-divider')
      params.selfClosing = true
      return
    }
    if (has(params.attr, 'header')) {
      params.tag = 'h6'
      params.attr.class.push('dropdown-header')
      return
    }
    for (const item of ['active', 'disabled']) {
      if (has(params.attr, item)) params.attr.class.push(item)
      delete params.attr[item]
    }
    params.attr.class.push(cls)
  }
}

export default dropdownItem
