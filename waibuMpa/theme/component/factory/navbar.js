import { breakpoints, parseSimple } from '../method/after-build-tag/_lib.js'
const cls = 'navbar'

async function navbar () {
  return class Navbar extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'nav', cls })
    }

    build = async () => {
      const { omit, cloneDeep, has } = this.plugin.lib._
      const { generateId, numUnit } = this.plugin.app.bajo
      const { groupAttrs } = this.plugin.app.waibuMpa
      const { $ } = this.component

      this.params.group = groupAttrs(this.params.attr, ['container', 'drawer'])
      this.params.attr = cloneDeep(this.params.group._)
      if (this.params.attr.expandable === true) this.params.attr.expandable = 'lg'
      let type = 'collapse'
      if (this.params.attr.drawer) {
        type = 'offcanvas'
        delete this.params.attr.scroll
      }
      let brand = ''
      let html = $(`<div>${this.params.html}</div>`).children().each(function () {
        if ($(this).hasClass('navbar-brand') && !has(this.attribs, 'collapse')) {
          brand = $(this).removeAttr('collapse').prop('outerHTML')
          $(this).remove()
        }
      }).parent().html() || ''
      if (this.params.attr.expandable && breakpoints.includes(this.params.attr.expandable)) {
        const el = $(`<div>${html}</div>`).find('.nav')
          .addClass(`navbar-nav${this.params.attr.scroll ? ' navbar-nav-scroll' : ''}`)
        if (this.params.attr.scroll) el.prop('style', `--bs-scroll-height: ${numUnit(this.params.attr.scroll, 'px')};`)
        html = el.removeClass('nav').parent().html()
        this.params.attr.class.push(parseSimple.call(this, { cls: `${cls}-expand`, value: this.params.attr.expandable, values: breakpoints }))
        const id = generateId()
        if (this.params.group.drawer) this.params.group.drawer.id = id
        const btn = `<button class="navbar-toggler" type="button" data-bs-toggle="${type}" ` +
          `data-bs-target="#${id}" aria-controls="${id}"${this.params.attr.drawer ? '' : ' aria-expanded="false"'} aria-label="${this.component.req.t('Toggle Navigation')}">` +
          '<span class="navbar-toggler-icon"></span></button>'
        if (type === 'offcanvas') html = await this.component.buildTag({ tag: 'drawer', attr: this.params.group.drawer, html })
        else html = `<div class="collapse navbar-collapse justify-content-between" id="${id}">${html}</div>`
        this.params.html = `${brand}${btn}${html}`
      } else {
        this.params.html = `${brand}${html}`
      }
      this.params.attr = omit(this.params.attr, ['container'])
    }

    static async after (params = {}) {
      let result = params.result
      if (params.group.container) {
        result = await this.buildTag({ tag: 'container', attr: params.group.container, html: '---' })
        result = result.replace('---', params.html)
        result = `<${params.tag}${params.attrs}>${result}</${params.tag}>`
      }
      return result
    }
  }
}

export default navbar
