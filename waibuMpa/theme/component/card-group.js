const cls = 'card-group'

const cardGroup = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
  }
}

export default cardGroup
