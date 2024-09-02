import { colors, parseVariant } from './_after-build-tag/_lib.js'

const cls = 'alert'

const alert = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has, isEmpty } = this._
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
    if (has(params.attr, 'dismissible')) {
      params.attr.class.push('alert-dismissible', 'fade', 'show')
      params.html += `\n<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="${reply.request.t('Close')}"></button`
    }
  }
}

export default alert
