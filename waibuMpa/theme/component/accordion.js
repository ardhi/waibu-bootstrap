const cls = 'accordion'

const accordion = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { generateId } = this.plugin.app.bajo
    const { has, omit } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    if (has(params.attr, 'flush')) params.attr.class.push('accordion-flush')
    params.attr.id = has(params.attr, 'id') ? params.attr.id : generateId()
    if (!has(params.attr, 'always-open')) {
      const me = this
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        me.$(this).find('.accordion-collapse').prop('data-bs-parent', '#' + params.attr.id)
      }).parent().html()
    }
    params.attr = omit(params.attr, ['always-open', 'flush'])
  }
}

export default accordion
