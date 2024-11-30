const cls = 'btn-close'

async function btnClose (component) {
  return class BtnClose extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'button', cls, type: 'button', ariaLabel: this.component.req.t('Close') })
      const { isString } = this.plugin.app.bajo.lib._
      if (this.params.attr.close) this.params.attr.dataBsDismiss = isString(this.params.attr.close) ? this.params.attr.close : 'modal'
      if (this.params.attr.disabled) this.params.attr.class.push('disabled')
      this.params.html = ''
      delete this.params.attr.disabled
    }
  }
}

export default btnClose
