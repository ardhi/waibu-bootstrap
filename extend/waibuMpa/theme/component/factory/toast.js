const cls = 'toast'

async function toast () {
  return class Toast extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls, tag: 'div', role: 'alert', ariaLive: 'assertive', ariaAtomic: 'true' })
    }

    build = async () => {
      const { isString, omit, has, get } = this.app.lib._
      const header = []
      if (this.params.attr.noHide) this.params.attr.dataBsAutohide = 'false'
      let delay = get(this, 'component.req.site.setting.waibuBootstrap.toastAutohideDelayDur', 5000)
      if (has(this.params.attr, 'autohideDelay')) delay = Number(this.params.attr.autohideDelay) || delay
      this.params.attr.dataBsDelay = delay
      if (isString(this.params.attr.title)) {
        header.push('<div class="toast-header">')
        header.push(`<strong class="me-auto">${this.params.attr.title}</strong>`)
        header.push(`<small class="text-body-secondary">${this.params.attr.caption ?? ''}</small>`)
        if (!this.params.attr.noDismiss) header.push(await this.component.buildTag({ tag: 'btnClose', attr: { close: cls } }))
        header.push('</div>')
      }
      const html = [header.join('\n'), `<div class="toast-body">${this.params.html}</div>`]
      if (header.length === 0 && !this.params.attr.noDismiss) {
        html.push(await this.component.buildTag({ tag: 'btnClose', attr: { close: cls, margin: 'all-auto end-2 top-2' } }))
        html.unshift('<div class="d-flex justify-content-between align-items-start">')
        html.push('</div>')
      }
      this.params.html = html.join('\n')
      this.params.attr = omit(this.params.attr, ['title', 'caption'])
    }
  }
}

export default toast
