const cls = 'blockquote'

const blockquote = {
  selector: cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.attr.class.push(cls)
    params.cls = cls
    if (has(params.attr, 'attribution')) {
      params.prepend = '<figure>'
      params.append = `<figcaption class="blockquote-footer">${params.attr.attribution}</figcaption></figure>`
      delete params.attr.attribution
    }
  }
}

export default blockquote
