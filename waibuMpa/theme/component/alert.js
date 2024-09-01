const cls = 'alert'

const alert = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'alert'
    params.cls = cls
    params.ezAttrs = ['color']
    const me = this
    params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if (this.name === 'a') me.$(this).addClass('alert-link')
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.name)) me.$(this).addClass('alert-heading')
    }).parent().html()
    if (has(params.attr, 'dismissible')) {
      params.attr.class.push('alert-dismissible', 'fade', 'show')
      params.html += `\n<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="${reply.request.t('Close')}"></button`
    }
    delete params.attr.dismissible
  }
}

export default alert
