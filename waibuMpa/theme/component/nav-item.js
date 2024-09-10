const cls = 'nav-item'

const navItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'a', cls: 'nav-link' })
    if (params.attr.dropdown) {
      params.attr.class.push('dropdown-toggle')
      params.attr.role = 'button'
      params.attr.dataBsToggle = 'dropdown'
      params.attr.ariaExpanded = 'false'
      params.dropdownMenu = params.html
      params.html = params.attr.label ?? params.req.t('Dropdown')
    }
    params.prepend = `<li class="${cls}${params.attr.dropdown ? ' dropdown' : ''}">`
    params.append = '</li>'
    delete params.attr.dropdown
  },
  after: async function (params = {}) {
    if (!params.dropdownMenu) return
    const $ = this.$
    const items = []
    $(`<div>${params.dropdownMenu}</div>`).children().each(function () {
      const children = $(this).children()
      if (children.length > 0) {
        children.each(function () {
          items.push($(this).parent().html())
        })
      } else items.push($(this).prop('outerHTML'))
    })
    return `${params.result}<div class="dropdown-menu">${items.join('\n')}</div>`
  }
}

export default navItem
