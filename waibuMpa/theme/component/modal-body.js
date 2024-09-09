const cls = 'modal-body'

const modalBody = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
  }
}

export default modalBody
