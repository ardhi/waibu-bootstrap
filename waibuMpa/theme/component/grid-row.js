const baseCls = 'row'

const gridRow = {
  selector: '.' + baseCls,
  handler: async function ({ params, reply } = {}) {
    params.attr.class.push(baseCls)
  }
}

export default gridRow
