const cls = 'card'

async function card () {
  return class Card extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
      if (this.params.attr.noBorder) this.params.attr.border = 'none'
    }

    build = async () => {
      const { $ } = this.component
      const children = $(`<div>${this.params.html}</div>`).children()
      this.params.html = children.each(function (idx) {
        if (idx === 0 && this.name === 'img') $(this).addClass('card-img-top')
        if ($(this).hasClass('list-group')) $(this).addClass('list-group-flush')
        if (idx === (children.length - 1) && this.name === 'img') $(this).addClass('card-img-bottom')
      }).parent().html()
    }
  }
}

export default card
