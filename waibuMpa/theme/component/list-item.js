const inlineClass = 'list-inline-item'

const listItem = {
  handler: async function (params = {}) {
    params.tag = 'li'
    if (params.attr.inline) params.attr.class.push(inlineClass)
    if (params.attr.color) params.attr.childColor = params.attr.color
  }
}

export default listItem
