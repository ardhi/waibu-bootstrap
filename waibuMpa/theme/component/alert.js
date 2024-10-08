import { colors, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'alert'

const alert = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isEmpty, without } = this.plugin.app.bajo.lib._
    const myColors = without(colors, 'link')
    this._normalizeAttr(params, { cls, tag: 'div', role: 'alert' })
    if (params.attr.color) params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: myColors, prepend: true }))
    const me = this
    const html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if (this.name === 'a') me.$(this).addClass('alert-link')
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.name)) me.$(this).addClass('alert-heading')
    }).parent().html()
    if (!isEmpty(html)) params.html = html
    if (params.attr.dismiss) {
      params.attr.class.push('alert-dismissible', 'fade', 'show')
      const attr = { 'data-bs-dismiss': 'alert' }
      params.html += await this.buildTag({ tag: 'btnClose', attr })
    }
  }
}

export default alert
