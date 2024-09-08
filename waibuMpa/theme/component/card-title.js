const cls = 'card-title'

const cardTitle = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'h5'
    params.attr.class.push(cls)
  }
}

export default cardTitle
