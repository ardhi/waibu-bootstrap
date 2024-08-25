const baseClass = 'blockquote'

const blockquote = {
  selector: baseClass,
  handler: async function img ({ params, reply } = {}) {
    const { has } = this._
    params.attr.class.push(baseClass)
    params.baseClass = baseClass
    if (has(params.attr, 'attribution')) {
      params.prepend = '<figure>'
      params.append = `<figcaption class="blockquote-footer">${params.attr.attribution}</figcaption></figure>`
      delete params.attr.attribution
    }
  }
}

export default blockquote
