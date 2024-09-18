import { parseSimple, sizes } from './_after-build-tag/_lib.js'

const cls = 'btn-group'

const btnGroup = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const $ = this.$
    this._normalizeAttr(params, { tag: 'div', cls, role: 'group' })
    if (params.attr.size) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    const html = []
    $(`<div>${params.html}</div>`).children().each(function () {
      html.push($(this).hasClass('dropdown') ? $(this).html() : $(this).prop('outerHTML'))
    })
    params.html = html.join('\n')
  }
}

export default btnGroup
