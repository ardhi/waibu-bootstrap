import { aligns, breakpoints, parseVariant, parseSimple } from './_after-build-tag/_lib.js'
const cls = 'offcanvas'

const drawer = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', autoId: true, tabIndex: -1 })
    const attr = groupAttrs(params.attr, ['launch'])
    params.attr.responsive = params.attr.responsive ?? true
    params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.responsive, values: breakpoints }))
    params.attr = attr._
    if (isString(params.attr.idLabel)) params.attr.ariaLabelledby = params.attr.idLabel
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.side ?? 'end', values: aligns }))
    if (params.attr.scroll) params.attr.dataBsScroll = 'true'
    if (params.attr.noDismiss) params.attr.dataBsBackdrop = 'static'
    const header = []
    if (isString(params.attr.title) || !params.attr.noDismiss) {
      header.push('<div class="offcanvas-header">')
      if (isString(params.attr.title)) header.push(`<h5 class="offcanvas-title"${isString(params.attr.idLabel) ? ` id="${params.attr.idLabel}"` : ''}>${params.attr.title}</h5>`)
      if (!params.attr.noDismiss) header.push(await this.buildTag({ tag: 'btnClose', attr: { dataBsDismiss: 'offcanvas' } }))
      header.push('</div>')
    }
    params.html = `${header.join('\n')}<div class="offcanvas-body">${params.html}</div>`
    if (isString(params.attr.launch)) {
      attr.launch.open = `${params.attr.id}:offcanvas`
      if (params.attr.responsive) attr.launch.display = `type:none-${params.attr.responsive}`
      const btnParams = {
        tag: 'btn',
        attr: attr.launch,
        html: attr._.launch
      }
      params.prepend = await this.buildTag(btnParams)
    }
    params.attr = omit(params.attr, ['title'])
  }
}

export default drawer
