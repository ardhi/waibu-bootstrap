import { parseVariant, parseSimple, sizes, colors, colorVariants } from './_after-build-tag/_lib.js'

const cls = 'btn'

const btn = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { has, omit } = this.plugin.app.bajo.lib._
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
    if (params.attr.toggle) params.attr.dataBsToggle = 'button'
    if (params.attr.active) params.attr.ariaPressed = true
    params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors, variants: colorVariants, prepend: true }))
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
  }
}

export default btn
