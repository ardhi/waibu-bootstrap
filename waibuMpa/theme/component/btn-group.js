const baseCls = 'btn-group'

async function btnGroup ({ params, reply } = {}) {
  const attr = params.attr
  attr.class.push(baseCls)
  attr.role = 'group'
  return '.' + baseCls
}

export default btnGroup
