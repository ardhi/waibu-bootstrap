import { breakpoints, colors, parseVariant } from './_after-build-tag/_lib.js'
const cls = 'list'

const list = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    const { attribsStringify } = this.plugin.app.waibuMpa
    const me = this
    this._normalizeAttr(params, { tag: params.attr.ordered ? 'ol' : 'ul' })
    if (params.attr.hover) params.tag = 'div'
    if (isString(params.attr.type)) {
      params.attr.class.push(`${cls}-${params.attr.type}`)
      if (params.attr.type === 'group') {
        params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
          if (this.attribs['child-color']) {
            const color = parseVariant.call(me, {
              cls: `${cls}-${params.attr.type}-item`,
              value: this.attribs['child-color'],
              values: colors
            })
            me.$(this).addClass(color).removeAttr('child-color')
          }
          if (me.$(this).find('.badge').length > 0) me.$(this).addClass('d-flex justify-content-between align-items-center')
          me.$(this).find('label.form-check-label').addClass('stretched-link ms-1')
        }).parent().html()
        params.attr.class.push(parseVariant.call(this, {
          cls: `${cls}-${params.attr.type}-horizontal`,
          value: params.attr.horizontal,
          values: breakpoints
        }))
        if (params.attr.noBorder) params.attr.class.push(`${cls}-${params.attr.type}-flush`)
        if (params.attr.ordered) params.attr.class.push(`${cls}-${params.attr.type}-numbered`)
      }
      if (params.attr.hover) params.tag = 'div'
      const html = []
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        if (['group', 'inline'].includes(params.attr.type)) {
          me.$(this).addClass(`${cls}-${params.attr.type}-item`)
        }
        if (params.attr.hover) {
          if (params.attr.type === 'group') this.attribs.class += ' list-group-item-action'
          const attrs = attribsStringify(this.attribs)
          html.push(`<a href="#" ${attrs}>${me.$(this).html()}</a>`)
        }
      }).parent().html()
      if (html.length > 0) params.html = html.join('\n')
    }
    params.attr = omit(params.attr, ['type'])
  }
}

export default list
