const cls = 'card-link'

const cardLink = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'a'
    if (!params.attr.href) params.attr.href = '#'
    params.attr.class.push(cls)
  }
}

export default cardLink
