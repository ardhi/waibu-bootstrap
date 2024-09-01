const baseClass = 'list'

const list = {
  handler: async function ({ params, reply, el } = {}) {
    const { has, isEmpty, omit } = this._
    params.baseClass = baseClass
    params.tag = has(params.attr, 'ordered') ? 'ol' : 'ul'
    if (!isEmpty(params.attr.type)) {
      params.attr.class.push(`${baseClass}-${params.attr.type}`)
      params.tag = 'ul'
    }
    params.attr = omit(params.attr, ['type', 'ordered'])
  },
  after: async function ({ params, reply, el } = {}) {
    const $ = this.$
    if (params.attr.type === 'list-inline') {
      $(el).children('li, c\\:list-item').each(function () {
        $(this).addClass('list-inline-item')
        $(this).text('--------------------')
      })
    }
  }
}

export default list