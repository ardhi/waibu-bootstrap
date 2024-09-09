const cls = 'modal-header'

const modalHeader = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
  }
}

export default modalHeader
