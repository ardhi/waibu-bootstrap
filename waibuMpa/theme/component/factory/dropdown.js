import { dirs, breakpoints, parseSimple, parseVariant } from '../method/after-build-tag/_lib.js'

const cls = 'dropdown'
const variants = ['center']
export const autoCloses = ['true', 'false', 'inside', 'outside']

export async function buildMenu (params = {}) {
  const { numUnit } = this.plugin.app.bajo
  const { isString } = this.plugin.app.bajo.lib._
  const $ = this.component.$
  let menuHtml = this.params.html
  let style = this.params.attr.menuOnly ? 'display:block;' : ''
  if (isString(this.params.attr.menuMax)) {
    const max = parseInt(this.params.attr.menuMax)
    if (max > 0) {
      const items = []
      $(`<div>${this.params.html}</div>`).children().each(function () {
        items.push($(this).prop('outerHTML'))
      })
      const maxCols = Math.floor(items.length / max)
      let els = ''
      for (let i = 0; i < maxCols; i++) {
        els += '<c:grid-col>'
        for (let j = 0; j < parseInt(this.params.attr.menuMax); j++) {
          els += items[max * i + j]
        }
        els += '</c:grid-col>'
      }
      menuHtml = await this.component.buildSentence(`<c:grid-row gutter="0">${els}</c:grid-row>`)
      style = `min-width:${maxCols * 10}rem;`
    }
  } else if (this.params.attr.menuTag) {
    const items = []
    $(`<div>${this.params.html}</div>`).children().each(function () {
      const children = $(this).children('form,div,p')
      if (children.length > 0) {
        children.each(function () {
          items.push($(this).parent().html())
        })
      } else items.push($(this).prop('outerHTML'))
    })
    menuHtml = items.join('\n')
  }

  if (this.params.attr.menuScroll) {
    const minHeight = isString(this.params.attr.menuScroll) ? numUnit(this.params.attr.menuScroll, 'px') : '80px'
    style += `overflow:hidden;overflow-y:auto;max-height:calc(100vh - ${minHeight});`
  }
  const args = {
    tag: isString(this.params.attr.menuTag) ? this.params.attr.menuTag : 'div',
    attr: {
      class: [
        'dropdown-menu',
        parseVariant.call(this, { cls: 'dropdown-menu', value: this.params.attr.menu, values: dirs, variants: breakpoints, prepend: true })
      ],
      style
    },
    html: menuHtml
  }
  if (this.params.attr.id) args.attr.id = this.params.attr.id + '-menu'
  return await this.component.buildTag(args)
}

async function dropdown (component) {
  return class Dropdown extends component.baseFactory {
    constructor (options) {
      super(options)
      const { isString } = this.plugin.app.bajo.lib._
      this.selector = '.' + cls
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'div'
      this.component.normalizeAttr(this.params, { tag })
    }

    async build () {
      const { merge, cloneDeep, omit } = this.plugin.app.bajo.lib._
      const alpinejs = this.plugin.app.waibuAlpinejs
      const [dir, variant] = (this.params.attr.dir ?? 'down').split('-')
      const xcls = ['drop' + parseSimple.call(this, { value: dir, values: dirs })]
      if (variants.includes(variant)) xcls.push(`${xcls[0]}-${variant}`)
      this.params.attr.class.push(...xcls)
      const attr = cloneDeep(omit(this.params.attr, ['margin', 'padding']))
      let button = ''
      if (this.params.attr.menuOnly) this.params.attr.menuTag = 'div'
      const btnParams = {
        attr: merge(attr, {
          class: this.params.attr.noCaret ? [] : ['dropdown-toggle'],
          type: 'button',
          dataBsToggle: 'dropdown',
          ariaExpanded: false
        }),
        html: this.params.attr.split ? '<span class="visually-hidden">Toggle Dropdown</span>' : this.params.attr.content
      }
      if (this.params.attr.offset) btnParams.attr['data-bs-offset'] = this.params.attr.offset
      if (this.params.attr.autoClose && autoCloses.includes(this.params.attr.autoClose)) btnParams.attr.dataBsAutoClose = this.params.attr.autoClose
      if (this.params.attr.split) {
        btnParams.attr.class.push('dropdown-toggle-split')
        const splitParams = cloneDeep(btnParams)
        if (btnParams.attr.id) btnParams.attr.id += '-split'
        splitParams.tag = 'btn'
        splitParams.attr = omit(splitParams.attr, ['class', 'dataBsToggle', 'ariaExpanded', 'dataBsAutoClose', 'dataBsOffset'])
        if (alpinejs) btnParams.attr = alpinejs.stripAttrKeys(btnParams.attr)
        splitParams.html = this.params.attr.content
        button = await this.component.buildTag(splitParams)
        // xcls.shift()
        this.params.attr.class = ['btn-group', ...xcls]
      }
      btnParams.tag = 'btn'
      const btn = await this.component.buildTag(btnParams)
      const menu = await buildMenu.call(this, this.params)
      if (this.params.attr.menuOnly) {
        this.params.html = menu
        this.params.noTag = true
      } else this.params.html = [button, btn, menu].join('\n')
      this.params.attr = omit(this.params.attr, ['noCaret'])
    }
  }
}

export default dropdown
