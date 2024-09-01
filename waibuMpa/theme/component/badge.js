const cls = 'badge'

const badge = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has, omit } = this._
    params.tag = 'span'
    params.cls = cls
    if (has(params.attr, 'alt')) params.html += `<span class="visually-hidden">${params.attr.alt}</span>`
    if (has(params.attr, 'dot')) {
      params.attr.class.push('p-2')
      params.html = ''
    } else params.attr.class.push(cls)

    params.attr = omit(params.attr, ['alt', 'dot'])
  }
}

export default badge