import { sizes, parseSimple, breakpoints } from '../method/after-build-tag/_lib.js'
const cls = 'modal'
const modalSizes = ['xl', ...sizes]
const fullscreens = breakpoints.map(b => `${b}-down`)

async function modal () {
  return class Modal extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, autoId: true, tabIndex: -1, ariaHidden: 'true' })
    }

    build = async () => {
      const { isString, omit } = this.plugin.app.bajo.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const { $ } = this.component
      const group = groupAttrs(this.params.attr, ['trigger'])
      this.params.attr = group._
      this.params.attr.class.push(this.params.attr.noFade ? '' : 'fade')
      if (this.params.attr.noDismiss) this.params.attr.dataBsBackdrop = 'static'
      if (this.params.attr.noKeyboard) this.params.attr.dataBsKeyboard = 'false'
      let hasHeader = $(`<div>${this.params.html}</div>`).find('.modal-header').length > 0
      if (this.params.attr.noHeader) hasHeader = false
      if (!hasHeader) this.params.html = `<div class="modal-body ${this.params.attr.noPadding ? 'pt-0 ps-0 pe-0' : ''}">${this.params.html}</div>`
      if (!hasHeader && isString(this.params.attr.title)) {
        const items = ['<div class="modal-header">', '<h1 class="modal-title fs-5">']
        items.push(this.params.attr.title)
        items.push('</h1>')
        if (!this.params.attr.noDismiss) items.push(await this.component.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'modal' } }))
        items.push('</div>')
        this.params.html = items.join('\n') + '\n' + this.params.html
      }
      let fullscreen = ''
      if (this.params.attr.fullscreen) {
        const value = this.params.attr.fullscreen === true ? true : (this.params.attr.fullscreen + '-down')
        fullscreen = parseSimple.call(this, { cls: `${cls}-fullscreen`, value, values: fullscreens, acceptTrue: true })
      }
      this.params.html = `<div class="modal-dialog${this.params.attr.scroll ? ' modal-dialog-scrollable' : ''}` +
        ` ${!this.params.attr.size ? '' : parseSimple.call(this, { cls, value: this.params.attr.size, values: modalSizes })}` +
        ` ${this.params.attr.noCenter ? '' : 'modal-dialog-centered'} ${fullscreen}">` +
        `<div class="modal-content">${this.params.html}</div></div>`
      if (group.trigger) {
        group.trigger.dataBsTarget = `#${this.params.attr.id}`
        group.trigger.dataBsToggle = 'modal'
        group.trigger.ariaControls = this.params.attr.id
        const btnParams = {
          tag: 'btn',
          attr: group.trigger,
          html: group._.trigger
        }
        const pos = group.trigger.onEnd ? 'append' : 'prepend'
        this.params[pos] = await this.component.buildTag(btnParams)
      }
      this.params.attr = omit(this.params.attr, ['title', 'fullscreen'])
    }
  }
}

export default modal
