const cls = 'btn-close'

const btnClose = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'button'
    params.attr.class.push(cls)
    params.attr.type = 'button'
    params.attr.ariaLabel = params.req.t('Close')
    if (params.attr.disabled) params.attr.class.push('disabled')
    delete params.attr.disabled
  }
}

export default btnClose
