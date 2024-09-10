const cls = 'figure'

const figure = {
  selector: cls,
  handler: async function img (params = {}) {
    this._normalizeAttr(params, { cls })
    const $ = this.$
    params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if (this.name === 'img') $(this).addClass('figure-img')
    }).parent().html()
  }
}

export default figure
