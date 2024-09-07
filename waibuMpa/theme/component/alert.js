import { colors, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'alert'

const alert = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isEmpty } = this._
    const { req, reply } = params
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'alert'
    params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors, prepend: true }))
    const me = this
    const html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if (this.name === 'a') me.$(this).addClass('alert-link')
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.name)) me.$(this).addClass('alert-heading')
    }).parent().html()
    if (!isEmpty(html)) params.html = html
    if (params.attr.dismissible) {
      params.attr.class.push('alert-dismissible', 'fade', 'show')
      const attr = { 'data-bs-dismiss': 'alert' }
      params.html += await this.buildTag({ tag: 'btnClose', attr, req, reply })
    }
  }
}

export default alert
