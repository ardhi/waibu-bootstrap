const cls = 'accordion'

const accordion = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const $ = this.$
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    if (params.attr.noBorder) params.attr.class.push('accordion-flush')
    if (!params.attr.alwaysOpen) {
      params.html = $(`<div>${params.html}</div>`).children().each(function () {
        $(this).find('.accordion-collapse').prop('data-bs-parent', '#' + params.attr.id)
      }).parent().html()
    }
  }
}

export default accordion
