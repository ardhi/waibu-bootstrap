const cls = 'accordion'

async function accordion () {
  return class Accordion extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, autoId: true })
      if (this.params.attr.noBorder) this.params.attr.class.push('accordion-flush')
    }

    build = async () => {
      const { $ } = this.component
      if (!this.params.attr.alwaysOpen) {
        const me = this
        this.params.html = $(`<div>${this.params.html}</div>`).children().each(function () {
          $(this).find('.accordion-collapse').prop('data-bs-parent', '#' + me.params.attr.id)
        }).parent().html()
      }
    }
  }
}

export default accordion
