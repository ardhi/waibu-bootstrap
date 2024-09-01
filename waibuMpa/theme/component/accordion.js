const cls = 'accordion'

const accordion = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { generateId } = this.plugin.app.bajo
    const { has } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    if (params.attr.border === 'none') params.attr.class.push('accordion-flush')
    params.attr.id = has(params.attr, 'id') ? params.attr.id : generateId()
    if (!has(params.attr, 'always-open')) {
      const me = this
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        me.$(this).find('.accordion-collapse').prop('data-bs-parent', '#' + params.attr.id)
      }).parent().html()
    }
    delete params.attr['always-open']
  }
}

export default accordion
