import { dirs, breakpoints, parseSimple, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'dropdown'
const variants = ['center']
export const autoCloses = ['true', 'false', 'inside', 'outside']

export async function buildMenu (params = {}) {
  const { numUnit } = this.plugin.app.bajo
  const { isString } = this.plugin.app.bajo.lib._
  const $ = this.$
  let menuHtml = params.html
  if (params.attr.menuTag) {
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
  let style = params.attr.menuOnly ? 'display:block;' : ''
  if (params.attr.menuScroll) {
    const minHeight = isString(params.attr.menuScroll) ? numUnit(params.attr.menuScroll, 'px') : '80px'
    style += `overflow:hidden;overflow-y:auto;max-height:calc(100vh - ${minHeight});`
  }
  const args = {
    tag: isString(params.attr.menuTag) ? params.attr.menuTag : 'div',
    attr: {
      class: [
        'dropdown-menu',
        parseVariant.call(this, { cls: 'dropdown-menu', value: params.attr.menu, values: dirs, variants: breakpoints, prepend: true })
      ],
      style
    },
    html: menuHtml
  }
  if (params.attr.id) args.attr.id = params.attr.id + '-menu'
  return await this.buildTag(args)
}

const dropdown = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { merge, isString, cloneDeep, omit } = this.plugin.app.bajo.lib._
    const alpinejs = this.plugin.app.waibuAlpinejs
    const tag = isString(params.attr.tag) ? params.attr.tag : 'div'
    this._normalizeAttr(params, { tag })
    const [dir, variant] = (params.attr.dir ?? 'down').split('-')
    const xcls = ['drop' + parseSimple.call(this, { value: dir, values: dirs })]
    if (variants.includes(variant)) xcls.push(`${xcls[0]}-${variant}`)
    params.attr.class.push(...xcls)
    const attr = cloneDeep(omit(params.attr, ['margin', 'padding']))
    let button = ''
    if (params.attr.menuOnly) params.attr.menuTag = 'div'
    const btnParams = {
      attr: merge(attr, {
        class: ['dropdown-toggle'],
        type: 'button',
        dataBsToggle: 'dropdown',
        ariaExpanded: false
      }),
      html: params.attr.split ? '<span class="visually-hidden">Toggle Dropdown</span>' : params.attr.content
    }
    if (params.attr.offset) btnParams.attr['data-bs-offset'] = params.attr.offset
    if (params.attr.autoClose && autoCloses.includes(params.attr.autoClose)) btnParams.attr.dataBsAutoClose = params.attr.autoClose
    if (params.attr.split) {
      btnParams.attr.class.push('dropdown-toggle-split')
      const splitParams = cloneDeep(btnParams)
      if (btnParams.attr.id) btnParams.attr.id += '-split'
      splitParams.tag = 'btn'
      splitParams.attr = omit(splitParams.attr, ['class', 'dataBsToggle', 'ariaExpanded', 'dataBsAutoClose', 'dataBsOffset'])
      if (alpinejs) btnParams.attr = alpinejs.stripAttrKeys(btnParams.attr)
      splitParams.html = params.attr.content
      button = await this.buildTag(splitParams)
      // xcls.shift()
      params.attr.class = ['btn-group', ...xcls]
    }
    btnParams.tag = 'btn'
    const btn = await this.buildTag(btnParams)
    const menu = await buildMenu.call(this, params)
    if (params.attr.menuOnly) {
      params.html = menu
      params.noTag = true
    } else params.html = [button, btn, menu].join('\n')
  }
}

export default dropdown
