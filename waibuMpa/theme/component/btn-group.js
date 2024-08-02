const baseCls = 'btn-group'

const btnGroup = {
  selector: '.' + baseCls,
  handler: async function ({ params, reply } = {}) {
    const attr = params.attr
    attr.class.push(baseCls)
    attr.role = 'group'
  }
}

export default btnGroup
