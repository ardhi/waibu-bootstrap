import { dirs, breakpoints, parseSimple, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'dropdown'
const variants = ['center']
const autoCloses = ['true', 'false', 'inside', 'outside']

const dropdown = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { pick, merge, isString, cloneDeep, omit } = this.plugin.app.bajo.lib._
    params.tag = isString(params.attr.tag) ? params.attr.tag : 'div'
    const [dir, variant] = (params.attr.dir ?? 'down').split('-')
    const xcls = ['drop' + parseSimple.call(this, { value: dir, values: dirs })]
    if (variants.includes(variant)) xcls.push(`${xcls[0]}-${variant}`)
    params.attr.class.push(...xcls)
    const attr = pick(params.attr, ['color', 'href', 'tag', 'disabled', 'size'])
    const me = this
    let button = ''
    if (params.attr.menuOnly) params.attr.menuTag = 'div'
    const btnParams = {
      attr: merge(attr, {
        class: ['dropdown-toggle'],
        type: 'button',
        dataBsToggle: 'dropdown',
        ariaExpanded: false
      }),
      html: params.attr.split ? '<span class="visually-hidden">Toggle Dropdown</span>' : (params.attr.label ?? '')
    }
    if (params.attr.offset) btnParams.attr['data-bs-offset'] = params.attr.offset
    if (params.attr.autoClose && autoCloses.includes(params.attr.autoClose)) btnParams.attr.dataBsAutoClose = params.attr.autoClose
    if (params.attr.split) {
      btnParams.attr.class.push('dropdown-toggle-split')
      const buttonParams = cloneDeep(btnParams)
      buttonParams.attr = omit(buttonParams.attr, ['class', 'dataBsToggle', 'ariaExpanded', 'dataBsAutoClose', 'dataBsOffset'])
      buttonParams.html = params.attr.label ?? ''
      button = await this.buildTag(merge(buttonParams, {
        tag: 'btn',
        reply: params.reply,
        req: params.req
      }))
      // xcls.shift()
      params.attr.class = ['btn-group', ...xcls]
    }
    const btn = await this.buildTag(merge(btnParams, {
      tag: 'btn',
      reply: params.reply,
      req: params.req
    }))
    let menuHtml = params.html
    if (params.attr.menuTag) {
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
      tag: isString(params.attr.menuTag) ? params.attr.menuTag : 'ul',
      attr: {
        class: [
          'dropdown-menu',
          parseVariant.call(this, { cls: 'dropdown-menu', value: params.attr.menu, values: dirs, variants: breakpoints, prepend: true })
        ],
        style: params.attr.menuOnly ? 'display:block;' : ''
      },
      html: menuHtml
    })
    if (params.attr.menuOnly) {
      params.html = menu
      params.noTag = true
    } else params.html = [button, btn, menu].join('\n')
  }
}

export default dropdown
