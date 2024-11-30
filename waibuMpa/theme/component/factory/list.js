import { breakpoints, colors, parseVariant } from '../method/after-build-tag/_lib.js'
const cls = 'list'

async function list (component) {
  return class List extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: this.params.attr.ordered ? 'ol' : 'ul' })
    }

    async build () {
      const { isString, omit } = this.plugin.app.bajo.lib._
      const { attribsStringify } = this.plugin.app.waibuMpa
      const me = this
      if (this.params.attr.hover) this.params.tag = 'div'
      if (isString(this.params.attr.type)) {
        this.params.attr.class.push(`${cls}-${this.params.attr.type}`)
        if (this.params.attr.type === 'group') {
          this.params.html = this.component.$(`<div>${this.params.html}</div>`).children().each(function () {
            if (this.attribs['child-color']) {
              const color = parseVariant.call(me, {
                cls: `${cls}-${this.params.attr.type}-item`,
                value: this.attribs['child-color'],
                values: colors
              })
              me.$(this).addClass(color).removeAttr('child-color')
            }
            if (me.$(this).find('.badge').length > 0) me.$(this).addClass('d-flex justify-content-between align-items-center')
            me.$(this).find('label.form-check-label').addClass('stretched-link ms-1')
          }).parent().html()
          this.params.attr.class.push(parseVariant.call(this, {
            cls: `${cls}-${this.params.attr.type}-horizontal`,
            value: this.params.attr.horizontal,
            values: breakpoints
          }))
          if (this.params.attr.noBorder) this.params.attr.class.push(`${cls}-${this.params.attr.type}-flush`)
          if (this.params.attr.ordered) this.params.attr.class.push(`${cls}-${this.params.attr.type}-numbered`)
        }
        if (this.params.attr.hover) this.params.tag = 'div'
        const html = []
        this.params.html = this.component.$(`<div>${this.params.html}</div>`).children().each(function () {
          if (['group', 'inline'].includes(this.params.attr.type)) {
            me.$(this).addClass(`${cls}-${this.params.attr.type}-item`)
          }
          if (this.params.attr.hover) {
            if (this.params.attr.type === 'group') this.attribs.class += ' list-group-item-action'
            const attrs = attribsStringify(this.attribs)
            const item = me.$(this).html()
            if ((me.$(item)[0] ?? {}).name === 'a') html.push(me.$(item).addClass(this.attribs.class).prop('outerHTML'))
            else html.push(`<a href="#" ${attrs}>${me.$(this).html()}</a>`)
          }
        }).parent().html()
        if (html.length > 0) this.params.html = html.join('\n')
      }
      this.params.attr = omit(this.params.attr, ['type'])
    }
  }
}

export default list
