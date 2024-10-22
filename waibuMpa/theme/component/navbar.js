import { breakpoints, parseSimple } from './_after-build-tag/_lib.js'
const cls = 'navbar'

const navbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit, cloneDeep, has } = this.plugin.app.bajo.lib._
    const { generateId, numUnit } = this.plugin.app.bajo
    const { groupAttrs } = this.plugin.app.waibuMpa
    const $ = this.$

    this._normalizeAttr(params, { tag: 'nav', cls })
    params.group = groupAttrs(params.attr, ['container', 'drawer'])
    params.attr = cloneDeep(params.group._)
    if (params.attr.expandable === true) params.attr.expandable = 'lg'
    let type = 'collapse'
    if (params.attr.drawer) {
      type = 'offcanvas'
      delete params.attr.scroll
    }
    let brand = ''
    let html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if ($(this).hasClass('navbar-brand') && !has(this.attribs, 'collapse')) {
        brand = $(this).removeAttr('collapse').prop('outerHTML')
        $(this).remove()
      }
    }).parent().html() || ''
    if (params.attr.expandable && breakpoints.includes(params.attr.expandable)) {
      const el = $(`<div>${html}</div>`).find('.nav')
        .addClass(`navbar-nav${params.attr.scroll ? ' navbar-nav-scroll' : ''}`)
      if (params.attr.scroll) el.prop('style', `--bs-scroll-height: ${numUnit(params.attr.scroll, 'px')};`)
      html = el.removeClass('nav').parent().html()
      params.attr.class.push(parseSimple.call(this, { cls: `${cls}-expand`, value: params.attr.expandable, values: breakpoints }))
      const id = generateId()
      if (params.group.drawer) params.group.drawer.id = id
      const btn = `<button class="navbar-toggler" type="button" data-bs-toggle="${type}" ` +
        `data-bs-target="#${id}" aria-controls="${id}"${params.attr.drawer ? '' : ' aria-expanded="false"'} aria-label="${this.req.t('Toggle Navigation')}">` +
        '<span class="navbar-toggler-icon"></span></button>'
      if (type === 'offcanvas') html = await this.buildTag({ tag: 'drawer', attr: params.group.drawer, html })
      else html = `<div class="collapse navbar-collapse justify-content-between" id="${id}">${html}</div>`
      params.html = `${brand}${btn}${html}`
    } else {
      params.html = `${brand}${html}`
    }
    params.attr = omit(params.attr, ['container'])
  },
  after: async function (params = {}) {
    let result = params.result
    if (params.group.container) {
      result = await this.buildTag({ tag: 'container', attr: params.group.container, html: '---' })
      result = result.replace('---', params.html)
      result = `<${params.tag}${params.attrs}>${result}</${params.tag}>`
    }
    return result
  }
}

export default navbar
