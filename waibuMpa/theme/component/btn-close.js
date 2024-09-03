const cls = 'btn-close'

const btnClose = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'button'
    params.attr.class.push(cls)
    params.attr['aria-label'] = reply.request.t('Close')
    if (has(params.attr, 'disabled')) params.attr.class.push('disabled')
    delete params.attr.disabled
  }
}

export default btnClose
