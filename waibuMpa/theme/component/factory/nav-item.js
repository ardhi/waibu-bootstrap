import { buildMenu, autoCloses } from './dropdown.js'
const cls = 'nav-item'

async function navItem () {
  return class NavItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'a', cls: 'nav-link', href: this.params.attr.href ?? '#' })
    }

    async build () {
      const { isString } = this.plugin.app.bajo.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const { $ } = this.component
      const group = groupAttrs(this.params.attr, ['dropdown'])
      if (group.dropdown) {
        this.params.attr = group._
        this.params.attr.class.push('dropdown-toggle')
        this.params.attr.role = 'button'
        this.params.attr.dataBsToggle = 'dropdown'
        this.params.attr.ariaExpanded = 'false'
        if (group.dropdown.autoClose && autoCloses.includes(group.dropdown.autoClose)) this.params.attr.dataBsAutoClose = group.dropdown.autoClose
        this.params.dropdownMenu = this.params.html
        // find icon
        const icon = $(`<div>${this.params.html}</div>`).find('i').prop('outerHTML')
        this.params.dropdown = group.dropdown
        this.params.html = icon ?? this.params.attr.content
      }
      if (isString(this.params.attr.open)) {
        const [id, toggle = 'modal'] = this.params.attr.open.split(':')
        this.params.attr.dataBsTarget = `#${id}`
        this.params.attr.dataBsToggle = toggle
        this.params.attr.ariaControls = id
      }
      this.params.prepend = `<li class="${cls}${group.dropdown ? ' dropdown' : ''}${(group.dropdown ?? {}).dir ? (' drop' + group.dropdown.dir) : ''}">`
      this.params.append = '</li>'
      delete this.params.attr.dropdown
    }

    static async after (params = {}) {
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
}

export default navItem