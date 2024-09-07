const baseClass = 'row'

const gridRow = {
  selector: '.' + baseClass,
  handler: async function (params = {}) {
    params.attr.class.push(baseClass)
  }
}

export default gridRow
