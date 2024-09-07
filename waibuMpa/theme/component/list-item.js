const inlineClass = 'list-inline-item'

const listItem = {
  handler: async function (params = {}) {
    const { has, omit, get } = this._
    params.tag = 'li'
    const type = get(this.$(params.el).parent(), '0.attribs.type')
    if (type === 'inline') params.attr.class.push(inlineClass)
    else if (has(params.attr, 'inline')) params.attr.class.push(inlineClass)
    params.attr = omit(params.attr, ['inline'])
  }
}

export default listItem
