const cls = 'btn-close'

const btnClose = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'button', cls, type: 'button', ariaLabel: params.req.t('Close') })
    if (params.attr.disabled) params.attr.class.push('disabled')
    delete params.attr.disabled
  }
}

export default btnClose
