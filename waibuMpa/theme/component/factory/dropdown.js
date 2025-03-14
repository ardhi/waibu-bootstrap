import { dirs, breakpoints, parseSimple, parseVariant } from '../method/after-build-tag/_lib.js'

const cls = 'dropdown'
const variants = ['center']
export const autoCloses = ['true', 'false', 'inside', 'outside']

export async function buildMenu (params = {}) { // scope: component
  const { numUnit } = this.plugin.app.bajo
  const { isString } = this.plugin.lib._
  const $ = this.$
  let menuHtml = params.html
  let style = params.attr.menuOnly ? 'display:block;' : ''
  if (isString(params.attr.menuMax)) {
    const max = parseInt(params.attr.menuMax)
    if (max > 0) {
      const items = []
      $(`<div>${params.html}</div>`).children().each(function () {
        items.push($(this).prop('outerHTML'))
      })
      const maxCols = Math.floor(items.length / max)
      let els = ''
      for (let i = 0; i < maxCols; i++) {
        els += '<c:grid-col>'
        for (let j = 0; j < parseInt(params.attr.menuMax); j++) {
          els += items[max * i + j]
        }
        els += '</c:grid-col>'
      }
      menuHtml = await this.buildSentence(`<c:grid-row gutter="0">${els}</c:grid-row>`)
      style = `min-width:${maxCols * 10}rem;`
    }
  } else if (params.attr.menuTag) {
    const items = []
    $(`<div>${params.html}</div>`).children().each(function () {
      const children = $(this).children('form,div,p')
      if (children.length > 0) {
        children.each(function () {
          items.push($(this).parent().html())
        })
      } else items.push($(this).prop('outerHTML'))
    })
    menuHtml = items.join('\n')
  }

  if (params.attr.menuScroll) {
    const minHeight = isString(params.attr.menuScroll) ? numUnit(params.attr.menuScroll, 'px') : '80px'
    style += `overflow:hidden;overflow-y:auto;max-height:calc(100vh - ${minHeight});`
  }
  const args = {
    tag: isString(params.attr.menuTag) ? params.attr.menuTag : 'div',
    attr: {
      class: [
        'dropdown-menu',
        parseVariant.call(this, { cls: 'dropdown-menu', value: params.attr.menudir, values: dirs, variants: breakpoints, prepend: true })
      ],
      style
    },
    html: menuHtml
  }
  if (params.attr.id) args.attr.id = params.attr.id + '-menu'
  return await this.buildTag(args)
}

async function dropdown () {
  return class Dropdown extends this.baseFactory {
    constructor (options) {
      super(options)
      const { isString } = this.plugin.lib._
      this.selector = '.' + cls
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'div'
      this.component.normalizeAttr(this.params, { tag })
    }

    build = async () => {
      const { merge, cloneDeep, omit } = this.plugin.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const alpinejs = this.plugin.app.waibuAlpinejs
      const [dir, variant] = (this.params.attr.dir ?? 'down').split('-')
      const xcls = ['drop' + parseSimple.call(this, { value: dir, values: dirs })]
      if (variants.includes(variant)) xcls.push(`${xcls[0]}-${variant}`)
      this.params.attr.class.push(...xcls)
      const group = groupAttrs(this.params.attr, ['trigger'])
      this.params.attr = group._
      let button = ''
      if (this.params.attr.menuOnly) this.params.attr.menuTag = 'div'
      const btnParams = {
        attr: merge(group.trigger, {
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
      const menu = await buildMenu.call(this.component, this.params)
      if (this.params.attr.menuOnly) {
        this.params.html = menu
        this.params.noTag = true
      } else this.params.html = [button, btn, menu].join('\n')
      this.params.attr = omit(this.params.attr, ['noCaret'])
    }
  }
}

export default dropdown
