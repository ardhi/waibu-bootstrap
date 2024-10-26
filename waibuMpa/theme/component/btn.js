import { parseVariant, parseSimple, sizes, colors, colorVariants } from './_after-build-tag/_lib.js'

const cls = 'btn'

const btn = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { has, omit, isString } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { cls })
    params.attr.class.push(cls)
    // tag
    params.tag = !!params.attr.href || params.attr.tag === 'a' ? 'a' : 'button'
    if (params.tag === 'button' && params.attr.href) delete params.attr.href
    if (params.tag === 'a' && params.attr.href === true) params.attr.href = '#'
    if (params.tag === 'a') params.attr.role = 'button'
    if (params.tag === 'button' && !has(params.attr, 'type')) params.attr.type = 'button'

    if (params.attr.disabled && params.tag === 'a') {
      params.attr.class.push('disabled')
      params.attr.ariaDisabled = true
      params.attr.tabIndex = -1
      params.attr = omit(params.attr, ['disabled', 'href'])
    }
    if (params.attr.dismiss === 'drawer') params.attr.dismiss = 'offcanvas'
    if (params.attr.toggle) params.attr.dataBsToggle = 'button'
    if (params.attr.active) params.attr.ariaPressed = true
    if (params.attr.color) params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors, variants: colorVariants, prepend: true }))
    if (params.attr.size) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    if (params.attr.dismiss) params.attr.dataBsDismiss = isString(params.attr.dismiss) ? params.attr.dismiss : 'modal'
    if (params.html.includes('<i class="') && params.attr.href) params.attr.class.push('icon-link')
  }
}

export default btn
