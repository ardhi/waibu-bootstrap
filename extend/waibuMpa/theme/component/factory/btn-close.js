const cls = 'btn-close'

async function btnClose () {
  return class BtnClose extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'button', cls, type: 'button', ariaLabel: this.component.req.t('Close') })
      const { isString } = this.app.lib._
      if (this.params.attr.close) this.params.attr.dataBsDismiss = isString(this.params.attr.close) ? this.params.attr.close : 'modal'
      if (this.params.attr.disabled) this.params.attr.class.push('disabled')
      this.params.html = ''
      delete this.params.attr.disabled
    }
  }
}

export default btnClose
