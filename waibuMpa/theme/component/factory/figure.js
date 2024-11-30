const cls = 'figure'

async function figure (component) {
  return class Figure extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
    }

    async build () {
      const { $ } = this.component
      this.params.html = $(`<div>${this.params.html}</div>`).children().each(function () {
        if (this.name === 'img') $(this).addClass('figure-img')
      }).parent().html()
    }
  }
}

export default figure
