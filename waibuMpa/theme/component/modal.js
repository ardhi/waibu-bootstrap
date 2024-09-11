import { sizes, parseSimple, breakpoints } from './_after-build-tag/_lib.js'
const cls = 'modal'
const modalSizes = ['xl', ...sizes]
const fullscreens = breakpoints.map(b => `${b}-down`)

const modal = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, merge, pick, omit } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true, tabIndex: -1, ariaHidden: 'true' })
    const attr = groupAttrs(params.attr, ['trigger'])
    params.attr = attr._
    params.attr.class.push(params.attr.noFade ? '' : 'fade')
    if (params.attr.noDismiss) params.attr.dataBsBackdrop = 'static'
    if (params.attr.noKeyboard) params.attr.dataBsKeyboard = 'false'
    if (isString(params.attr.title) || !params.attr.noDismiss) {
      const items = ['<div class="modal-header">', '<h1 class="modal-title fs-5">']
      items.push(params.attr.title)
      items.push('</h1>')
      if (!params.attr.noDismiss) items.push(await this.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'modal' }, req: params.req, reply: params.reply }))
      items.push('</div>')
      params.html = items.join('\n') + '\n' + params.html
    }
    let fullscreen = ''
    if (params.attr.fullscreen) {
      const value = params.attr.fullscreen === true ? true : (params.attr.fullscreen + '-down')
      fullscreen = parseSimple.call(this, { cls: `${cls}-fullscreen`, value, values: fullscreens, acceptTrue: true })
    }
    params.html = `<div class="modal-dialog${params.attr.scrollable ? ' modal-dialog-scrollable' : ''}` +
      ` ${!params.attr.size ? '' : parseSimple.call(this, { cls, value: params.attr.size, values: modalSizes })}` +
      `${params.attr.centered ? ' modal-dialog-centered' : ''} ${fullscreen}">` +
      `<div class="modal-content">${params.html}</div></div>`
    if (isString(params.attr.trigger)) {
      const btnParams = merge({}, pick(params, ['req', 'reply']), {
        tag: 'btn',
        attr: merge(attr.trigger, { open: `${params.attr.id}:modal` }),
        html: attr._.trigger
      })
      params.prepend = await this.buildTag(btnParams)
    }
    params.attr = omit(params.attr, ['title', 'fullscreen'])
  }
}

export default modal
