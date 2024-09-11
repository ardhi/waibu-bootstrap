const cls = 'nav'
const types = ['tabs', 'pills', 'underline']

const nav = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const $ = this.$
    this._normalizeAttr(params, { tag: 'nav', cls })
    if (types.includes(params.attr.type)) params.attr.class.push(`nav-${params.attr.type}`)
    if (params.attr.fill) params.attr.class.push('nav-fill')
    if (isString(params.attr.tag)) params.tag = params.attr.tag
    if (!['ol', 'ul'].includes(params.tag)) {
      const html = []
      $(`<div>${params.html}</div>`).children().each(function () {
        html.push($(this).html())
      })
      params.html = html.join('\n')
    }
    delete params.attr.type
  }
}

export default nav
