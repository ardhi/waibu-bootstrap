const cls = 'dropdown-item'

async function dropdownItem () {
  return class DropdownItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'a' })
    }

    build = async () => {
      if (!this.params.attr.href) this.params.attr.href = '#'
      if (this.params.attr.divider) {
        this.params.tag = 'hr'
        this.params.attr.class.push('dropdown-divider')
        this.params.selfClosing = true
        return
      }
      if (this.params.attr.header) {
        this.params.tag = 'h6'
        this.params.attr.class.push('dropdown-header')
        return
      }
      if (this.params.attr.disabled) {
        this.params.attr.class.push('disabled')
        delete this.params.attr.disabled
      }
      this.params.attr.class.push(cls)
    }
  }
}

export default dropdownItem
