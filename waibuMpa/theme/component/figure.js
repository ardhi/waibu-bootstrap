const cls = 'figure'

const figure = {
  selector: cls,
  handler: async function img (params = {}) {
    params.attr.class.push(cls)
    const me = this
    params.html = this.$(`<div>${params.html}</div>`).children().each(function () {
      if (this.name === 'img') me.$(this).addClass('figure-img')
    }).parent().html()
  }
}

export default figure
