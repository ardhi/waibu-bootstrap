import { parseSimple, sizes } from '../method/after-build-tag/_lib.js'

const cls = 'btn-group'

async function btnGroup (component) {
  return class BtnGroup extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, role: 'group' })
      if (this.params.attr.size) this.params.attr.class.push(parseSimple.call(this, { cls, value: this.params.attr.size, values: sizes }))
    }

    async build () {
      const { $ } = this.component
      const html = []
      $(`<div>${this.params.html}</div>`).children().each(function () {
        html.push($(this).hasClass('dropdown') ? $(this).html() : $(this).prop('outerHTML'))
      })
      this.params.html = html.join('\n')
    }
  }
}

export default btnGroup
