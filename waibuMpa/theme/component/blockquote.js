const cls = 'blockquote'

const blockquote = {
  selector: cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    params.attr.class.push(cls)
    if (isString(params.attr.attribution)) {
      params.prepend = '<figure>'
      params.append = `<figcaption class="blockquote-footer">${params.attr.attribution}</figcaption></figure>`
      delete params.attr.attribution
    }
  }
}

export default blockquote
