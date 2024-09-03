import { dirs, breakpoints, parseSimple, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'dropdown'
const variants = ['center']
const autoCloses = ['true', 'false', 'inside', 'outside']

const dropdown = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { pick, merge, has, cloneDeep, omit } = this._
    params.tag = has(params.attr, 'tag') ? params.attr.tag : 'div'
    const [dir, variant] = (params.attr.dir ?? 'down').split('-')
    const xcls = ['drop' + parseSimple.call(this, { value: dir, values: dirs })]
    if (variants.includes(variant)) xcls.push(`${xcls[0]}-${variant}`)
    params.attr.class.push(...xcls)
    const attr = pick(params.attr, ['color', 'href', 'tag', 'disabled', 'size'])
    const me = this
    let button = ''
    const hasSplitter = has(params.attr, 'split')
    const menuOnly = has(params.attr, 'menu-only')
    if (menuOnly) params.attr['menu-tag'] = 'div'
    const btnParams = {
      attr: merge(attr, {
        class: ['dropdown-toggle'],
        type: 'button',
        'data-bs-toggle': 'dropdown',
        'aria-expanded': false
      }),
      html: hasSplitter ? '<span class="visually-hidden">Toggle Dropdown</span>' : (params.attr.label ?? '')
    }
    if (has(params.attr, 'offset')) btnParams.attr['data-bs-offset'] = params.attr.offset
    if (has(params.attr, 'auto-close') && autoCloses.includes(params.attr['auto-close'])) btnParams.attr['data-bs-auto-close'] = params.attr['auto-close']
    if (hasSplitter) {
      btnParams.attr.class.push('dropdown-toggle-split')
      const buttonParams = cloneDeep(btnParams)
      buttonParams.attr = omit(buttonParams.attr, ['class', 'data-bs-toggle', 'aria-expanded', 'data-bs-auto-close', 'data-bs-offset'])
      buttonParams.html = params.attr.label ?? ''
      button = await this.buildTag({
        tag: 'btn',
        params: buttonParams,
        reply
      })
      // xcls.shift()
      params.attr.class = ['btn-group', ...xcls]
    }
    const btn = await this.buildTag({
      tag: 'btn',
      params: btnParams,
      reply
    })
    const hasTag = has(params.attr, 'menu-tag')
    let menuHtml = params.html
    if (hasTag) {
      const items = []
      this.$(`<div>${params.html}</div>`).children().each(function () {
        const children = me.$(this).children()
        if (children.length > 0) {
          children.each(function () {
            items.push(me.$(this).parent().html())
          })
        } else items.push(me.$(this).prop('outerHTML'))
      })
      menuHtml = items.join('\n')
    }
    const menu = await this.buildTag({
      tag: hasTag ? params.attr['menu-tag'] : 'ul',
      params: {
        attr: {
          class: [
            'dropdown-menu',
            parseVariant.call(this, { cls: 'dropdown-menu', value: params.attr.menu, values: dirs, variants: breakpoints, prepend: true })
          ],
          style: menuOnly ? 'display:block;' : ''
        },
        html: menuHtml
      }
    })
    if (menuOnly) {
      params.html = menu
      params.noTag = true
    } else params.html = [button, btn, menu].join('\n')
    params.attr = omit(params.attr, ['menu-only', 'menu-tag'])
  }
}

export default dropdown
