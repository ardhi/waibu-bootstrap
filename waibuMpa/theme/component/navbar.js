import { breakpoints, parseSimple } from './_after-build-tag/_lib.js'
const cls = 'navbar'

const navbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit, cloneDeep, has } = this.plugin.app.bajo.lib._
    const { generateId } = this.plugin.app.bajo
    const { groupAttrs } = this.plugin.app.waibuMpa
    const $ = this.$

    this._normalizeAttr(params, { tag: 'nav', cls })
    params.group = groupAttrs(params.attr, ['container'])
    params.attr = cloneDeep(params.group._)
    if (params.attr.expandable === true) params.attr.expandable = 'lg'
    if (params.attr.expandable && breakpoints.includes(params.attr.expandable)) {
      params.attr.class.push(parseSimple.call(this, { cls: `${cls}-expand`, value: params.attr.expandable, values: breakpoints }))
      const id = generateId()
      let brand = ''
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        if ($(this).hasClass('navbar-brand') && !has(this.attribs, 'collapse')) {
          brand = $(this).removeAttr('collapse').prop('outerHTML')
          $(this).remove()
        }
      }).parent().html() || ''
      const btn = '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" ' +
        `data-bs-target="#${id}" aria-controls="${id}" aria-expanded="false" aria-label="${params.req.t('Toggle Navigation')}">` +
        '<span class="navbar-toggler-icon"></span></button>'
      params.html = $(`<div>${params.html}</div>`).find('.nav')
        .addClass(`navbar-nav${params.attr.scrollable ? ' navbar-nav-scroll' : ''}`)
        .prop('style', params.attr.scrollable === true ? '' : `--bs-scroll-height: ${params.attr.scrollable}px;`)
        .removeClass('nav').parent().html()
      params.html = `${brand}${btn}<div class="collapse navbar-collapse" id="${id}">${params.html}</div>`
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
