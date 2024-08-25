const baseClass = 'btn-group'

const btnGroup = {
  selector: '.' + baseClass,
  handler: async function ({ params, reply } = {}) {
    const attr = params.attr
    attr.class.push(baseClass)
    attr.role = 'group'
  }
}

export default btnGroup
