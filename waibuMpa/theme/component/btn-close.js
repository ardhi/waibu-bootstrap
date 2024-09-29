const cls = 'btn-close'

const btnClose = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { tag: 'button', cls, type: 'button', ariaLabel: this.req.t('Close') })
    if (params.attr.close) params.attr.dataBsDismiss = isString(params.attr.close) ? params.attr.close : 'modal'
    if (params.attr.disabled) params.attr.class.push('disabled')
    params.html = ''
    delete params.attr.disabled
  }
}

export default btnClose
