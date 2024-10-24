import { buildMenu, autoCloses } from './dropdown.js'
const cls = 'nav-item'

const navItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'a', cls: 'nav-link', href: params.attr.href ?? '#' })
    const group = groupAttrs(params.attr, ['dropdown'])
    if (group.dropdown) {
      params.attr = group._
      params.attr.class.push('dropdown-toggle')
      params.attr.role = 'button'
      params.attr.dataBsToggle = 'dropdown'
      params.attr.ariaExpanded = 'false'
      if (group.dropdown.autoClose && autoCloses.includes(group.dropdown.autoClose)) params.attr.dataBsAutoClose = group.dropdown.autoClose
      params.dropdownMenu = params.html
      // find icon
      const icon = this.$(`<div>${params.html}</div>`).find('i').prop('outerHTML')
      params.dropdown = group.dropdown
      params.html = icon ?? params.attr.content
    }
    if (isString(params.attr.open)) {
      const [id, toggle = 'modal'] = params.attr.open.split(':')
      params.attr.dataBsTarget = `#${id}`
      params.attr.dataBsToggle = toggle
      params.attr.ariaControls = id
    }
    params.prepend = `<li class="${cls}${group.dropdown ? ' dropdown' : ''}${(group.dropdown ?? {}).dir ? (' drop' + group.dropdown.dir) : ''}">`
    params.append = '</li>'
    delete params.attr.dropdown
  },
  after: async function (params = {}) {
    if (!params.dropdown) return
    params.dropdown.menuTag = 'div'
    const $ = this.$
    const items = []
    $(`<div>${params.dropdownMenu}</div>`).children().each(function () {
      if (this.name !== 'i') items.push($(this).prop('outerHTML'))
    })
    const menu = await buildMenu.call(this, { attr: params.dropdown, html: items.join('\n') })
    return `${params.result}${menu}`
  }
}

export default navItem
