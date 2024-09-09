import { sizes, parseSimple, breakpoints } from './_after-build-tag/_lib.js'
const cls = 'modal'
const modalSizes = ['xl', ...sizes]
const fullscreens = breakpoints.map(b => `${b}-down`)

const modal = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, merge, pick, omit } = this.plugin.app.bajo.lib._
    const { generateId } = this.plugin.app.bajo
    const { groupAttrs } = this.plugin.app.waibuMpa
    params.tag = 'div'
    const attr = groupAttrs(params.attr, ['trigger'])
    params.attr.class.push(cls, params.attr.noFade ? '' : 'fade')
    params.attr = attr._
    params.attr.id = isString(params.attr.id) ? params.attr.id : generateId()
    params.attr.tabIndex = -1
    params.attr.ariaLabelledby = params.attr.label ?? params.req.t('Modal Dialog')
    params.attr.ariaHidden = 'true'
    if (params.attr.noBackdropClose) params.attr.dataBsBackdrop = 'static'
    if (params.attr.noKeyboard) params.attr.dataBsKeyboard = 'false'
    if (isString(params.attr.title)) {
      const items = ['<div class="modal-header">', '<h1 class="modal-title fs-5">']
      items.push(params.attr.title)
      items.push('</h1>')
      if (params.attr.dismissible) items.push(await this.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'modal' }, req: params.req, reply: params.reply }))
      items.push('</div>')
      params.html = items.join('\n') + '\n' + params.html
    }
    let fullscreen = ''
    if (params.attr.fullscreen) {
      const value = params.attr.fullscreen === true ? true : (params.attr.fullscreen + '-down')
      fullscreen = parseSimple.call(this, { cls: `${cls}-fullscreen`, value, values: fullscreens, acceptTrue: true })
    }
    params.html = `<div class="modal-dialog${params.attr.scrollable ? ' modal-dialog-scrollable' : ''}` +
      ` ${parseSimple.call(this, { cls, value: params.attr.size, values: modalSizes })}` +
      `${params.attr.centered ? ' modal-dialog-centered' : ''} ${fullscreen}">` +
      `<div class="modal-content">${params.html}</div></div>`
    if (isString(params.attr.trigger)) {
      const btnParams = merge({}, pick(params, ['req', 'reply']), {
        tag: 'btn',
        attr: merge(attr.trigger, { modalOpen: params.attr.id }),
        html: attr._.trigger
      })
      params.prepend = await this.buildTag(btnParams)
    }
    params.attr = omit(params.attr, ['title', 'noBackdropClose', 'fullscreen'])
  }
}

export default modal
