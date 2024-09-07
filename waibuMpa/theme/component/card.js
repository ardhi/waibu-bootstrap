const cls = 'card'

const card = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
  }
}

export default card
