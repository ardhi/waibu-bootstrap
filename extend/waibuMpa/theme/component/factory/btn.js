import { parseVariant, parseSimple, sizes, colors, colorVariants } from '../method/after-build-tag/_lib.js'

const cls = 'btn'

async function btn () {
  return class Btn extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
      this.params.attr.class.push(cls)
    }

    build = async () => {
      const { has, omit, isString } = this.app.lib._
      // tag
      this.params.tag = !!this.params.attr.href || this.params.attr.tag === 'a' ? 'a' : 'button'
      if (this.params.tag === 'button' && this.params.attr.href) delete this.params.attr.href
      if (this.params.tag === 'a' && this.params.attr.href === true) this.params.attr.href = '#'
      if (this.params.tag === 'a') this.params.attr.role = 'button'
      if (this.params.tag === 'button' && !has(this.params.attr, 'type')) this.params.attr.type = 'button'

      if (this.params.attr.disabled && this.params.tag === 'a') {
        this.params.attr.class.push('disabled')
        this.params.attr.ariaDisabled = true
        this.params.attr.tabIndex = -1
        this.params.attr = omit(this.params.attr, ['disabled', 'href'])
      }
      if (this.params.attr.dismiss === 'drawer') this.params.attr.dismiss = 'offcanvas'
      if (this.params.attr.toggle) this.params.attr.dataBsToggle = 'button'
      if (this.params.attr.active) this.params.attr.ariaPressed = true
      if (this.params.attr.color) this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.color, values: colors, variants: colorVariants, prepend: true }))
      if (this.params.attr.size) this.params.attr.class.push(parseSimple.call(this, { cls, value: this.params.attr.size, values: sizes }))
      if (this.params.attr.dismiss) this.params.attr.dataBsDismiss = isString(this.params.attr.dismiss) ? this.params.attr.dismiss : 'modal'
      if (this.params.html.includes('<i class="') && this.params.attr.href) this.params.attr.class.push('icon-link')
    }
  }
}

export default btn
