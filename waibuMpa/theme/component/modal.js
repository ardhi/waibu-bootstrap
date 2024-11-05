import { sizes, parseSimple, breakpoints } from './_after-build-tag/_lib.js'
const cls = 'modal'
const modalSizes = ['xl', ...sizes]
const fullscreens = breakpoints.map(b => `${b}-down`)

const modal = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true, tabIndex: -1, ariaHidden: 'true' })
    const group = groupAttrs(params.attr, ['launch'])
    params.attr = group._
    params.attr.class.push(params.attr.noFade ? '' : 'fade')
    if (params.attr.noDismiss) params.attr.dataBsBackdrop = 'static'
    if (params.attr.noKeyboard) params.attr.dataBsKeyboard = 'false'
    if (this.$(`<div>${params.html}</div>`).find('.modal-body, .modal-footer, .modal-header').length === 0) params.html = `<div class="modal-body">${params.html}</div>`
    const hasHeader = this.$(`<div>${params.html}</div>`).find('.modal-header').length > 0
    if (!hasHeader && (isString(params.attr.title) || !params.attr.noDismiss)) {
      const items = ['<div class="modal-header">', '<h1 class="modal-title fs-5">']
      items.push(params.attr.title)
      items.push('</h1>')
      if (!params.attr.noDismiss) items.push(await this.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'modal' } }))
      items.push('</div>')
      params.html = items.join('\n') + '\n' + params.html
    }
    let fullscreen = ''
    if (params.attr.fullscreen) {
      const value = params.attr.fullscreen === true ? true : (params.attr.fullscreen + '-down')
      fullscreen = parseSimple.call(this, { cls: `${cls}-fullscreen`, value, values: fullscreens, acceptTrue: true })
    }
    params.html = `<div class="modal-dialog${params.attr.scroll ? ' modal-dialog-scrollable' : ''}` +
      ` ${!params.attr.size ? '' : parseSimple.call(this, { cls, value: params.attr.size, values: modalSizes })}` +
      `${params.attr.noCenter ? '' : 'modal-dialog-centered'} ${fullscreen}">` +
      `<div class="modal-content">${params.html}</div></div>`
    if (group.launch) {
      group.launch.dataBsTarget = `#${params.attr.id}`
      group.launch.dataBsToggle = 'modal'
      group.launch.ariaControls = params.attr.id
      const btnParams = {
        tag: 'btn',
        attr: group.launch,
        html: group._.launch
      }
      const pos = group.launch.onEnd ? 'append' : 'prepend'
      params[pos] = await this.buildTag(btnParams)
    }
    params.attr = omit(params.attr, ['title', 'fullscreen'])
  }
}

export default modal
