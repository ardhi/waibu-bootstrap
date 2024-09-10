const cls = 'card'

const card = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
    const $ = this.$
    const children = this.$(`<div>${params.html}</div>`).children()
    params.html = children.each(function (idx) {
      if (idx === 0 && this.name === 'img') $(this).addClass('card-img-top')
      if ($(this).hasClass('list-group')) $(this).addClass('list-group-flush')
      if (idx === (children.length - 1) && this.name === 'img') $(this).addClass('card-img-bottom')
    }).parent().html()
  }
}

export default card
