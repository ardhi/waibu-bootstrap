const cls = 'modal'

const dialog = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, merge, pick } = this.plugin.app.bajo.lib._
    const { generateId } = this.plugin.app.bajo
    const { groupAttrs } = this.plugin.app.waibuMpa
    params.tag = 'div'
    const attr = groupAttrs(params.attr, ['trigger'])
    params.attr.class.push(cls, 'fade')
    params.attr = attr._
    params.attr.id = isString(params.attr.id) ? params.attr.id : generateId()
    params.attr.tabIndex = -1
    params.attr.ariaLabeledby = params.attr.label ?? params.req.t('Modal Dialog')
    params.attr.ariaHidden = 'true'
    if (isString(params.attr.title)) {
      const items = ['<div class="modal-header">', '<h1 class="modal-title fs-5">']
      items.push(params.attr.title)
      items.push('</h1>')
      if (params.attr.dismissible) items.push(await this.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'modal' }, req: params.req, reply: params.reply }))
      items.push('</div>')
      params.html = items.join('\n') + '\n' + params.html
    }
    params.html = `<div class="modal-dialog"><div class="modal-content">${params.html}</div></div>`
    if (isString(params.attr.trigger)) {
      const btnParams = merge({}, pick(params, ['req', 'reply']), {
        tag: 'btn',
        attr: merge(attr.trigger, { dataBsToggle: 'modal', dataBsTarget: `#${params.attr.id}` }),
        html: attr._.trigger
      })
      params.prepend = await this.buildTag(btnParams)
    }
  }
}

export default dialog
