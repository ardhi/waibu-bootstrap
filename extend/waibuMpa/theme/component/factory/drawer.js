import { aligns, breakpoints, parseVariant, parseSimple } from '../method/after-build-tag/_lib.js'
const cls = 'offcanvas'

async function drawer () {
  return class Drawer extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', autoId: true, tabIndex: -1 })
    }

    build = async () => {
      const { isString, omit, trim } = this.app.lib._
      const { groupAttrs } = this.app.waibuMpa
      const { $ } = this.component
      const group = groupAttrs(this.params.attr, ['trigger'])
      this.params.attr.responsive = this.params.attr.responsive ?? true
      this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.responsive, values: breakpoints }))
      this.params.attr = group._
      if (isString(this.params.attr.idLabel)) this.params.attr.ariaLabelledby = this.params.attr.idLabel
      this.params.attr.class.push(parseSimple.call(this, { cls, value: this.params.attr.side ?? 'end', values: aligns }))
      if (this.params.attr.scroll) this.params.attr.dataBsScroll = 'true'
      if (this.params.attr.noDismiss) this.params.attr.dataBsBackdrop = 'static'
      const buttons = []
      const html = []
      $(`<div>${this.params.html}</div>`).children().each(function () {
        if (this.name === 'drawer-toolbar') buttons.push(trim($(this).prop('innerHTML')))
        else html.push($(this).prop('outerHTML'))
      })
      this.params.html = html.join('\n')
      const header = []
      if (isString(this.params.attr.title) || !this.params.attr.noDismiss) {
        header.push('<div class="offcanvas-header justify-content-between">')
        if (isString(this.params.attr.title)) header.push(`<h5 class="offcanvas-title"${isString(this.params.attr.idLabel) ? ` id="${this.params.attr.idLabel}"` : ''}>${this.params.attr.title}</h5>`)
        header.push('<ul class="nav d-flex align-items-center">')
        header.push(...buttons)
        if (!this.params.attr.noDismiss) header.push(await this.component.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'offcanvas' } }))
        header.push('</ul></div>')
      }
      if (this.params.attr.divider) header.push('<hr class="m-0" />')
      this.params.html = `${header.join('\n')}<div${this.params.attr.noPadding ? '' : ' class="offcanvas-body"'}>${this.params.html}</div>`
      if (group.trigger) {
        group.trigger.dataBsTarget = `#${this.params.attr.id}`
        group.trigger.dataBsToggle = 'offcanvas'
        group.trigger.ariaControls = this.params.attr.id
        if (this.params.attr.responsive) group.trigger.display = `type:none-${this.params.attr.responsive}`
        const btnParams = {
          tag: 'btn',
          attr: group.trigger,
          html: group._.trigger
        }
        this.params.prepend = await this.component.buildTag(btnParams)
      }
      this.params.attr = omit(this.params.attr, ['title', 'noPadding'])
    }
  }
}

export default drawer
