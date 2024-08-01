const baseCls = 'row'

async function gridRow ({ params, reply } = {}) {
  params.attr.class.push(baseCls)

  return '.' + baseCls
}

export default gridRow
