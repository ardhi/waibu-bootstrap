const cls = 'accordion'

const accordion = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { generateId } = this.plugin.app.bajo
    const { isString } = this.plugin.app.bajo.lib._
    params.tag = 'div'
    params.attr.class.push(cls)
    if (params.attr.border === 'none') {
      params.attr.class.push('accordion-flush')
      delete params.attr.border
    }
    params.attr.id = isString(params.attr.id) ? params.attr.id : generateId()
    if (params.attr.alwaysOpen) {
      const me = this
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        me.$(this).find('.accordion-collapse').prop('data-bs-parent', '#' + params.attr.id)
      }).parent().html()
    }
  }
}

export default accordion
