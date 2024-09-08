const cls = 'badge'

const badge = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    params.tag = 'span'
    if (isString(params.attr.alt)) params.html += `<span class="visually-hidden">${params.attr.alt}</span>`
    if (params.attr.dot) {
      params.attr.class.push('p-2')
      params.html = ''
    } else params.attr.class.push(cls)

    params.attr = omit(params.attr, ['alt', 'dot'])
  }
}

export default badge
