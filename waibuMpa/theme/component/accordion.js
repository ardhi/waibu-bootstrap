const cls = 'accordion'

const accordion = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    if (params.attr.border === 'none') {
      params.attr.class.push('accordion-flush')
      delete params.attr.border
    }
    if (params.attr.alwaysOpen) {
      const me = this
      params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
        me.$(this).find('.accordion-collapse').prop('data-bs-parent', '#' + params.attr.id)
      }).parent().html()
    }
  }
}

export default accordion
