const cls = 'card'

const card = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
    const me = this
    const children = this.$(`<div>${params.html}</div>`).children()
    params.html = children.each(function (idx) {
      if (idx === 0 && this.name === 'img') me.$(this).addClass('card-img-top')
      if (me.$(this).hasClass('list-group')) me.$(this).addClass('list-group-flush')
      if (idx === (children.length - 1) && this.name === 'img') me.$(this).addClass('card-img-bottom')
    }).parent().html()
  }
}

export default card
