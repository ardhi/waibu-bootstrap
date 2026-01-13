const cls = 'figure'

async function figure () {
  return class Figure extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
    }

    build = async () => {
      const { $ } = this.component
      this.params.html = $(`<div>${this.params.html}</div>`).children().each(function () {
        if (this.name === 'img') $(this).addClass('figure-img')
      }).parent().html()
    }
  }
}

export default figure
