const cls = 'modal-footer'

const modalFooter = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'div'
    params.attr.class.push(cls)
  }
}

export default modalFooter
