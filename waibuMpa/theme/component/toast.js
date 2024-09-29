const cls = 'toast'

const toast = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { cls, tag: 'div', role: 'alert', ariaLive: 'assertive', ariaAtomic: 'true' })
    const header = []
    if (isString(params.attr.title)) {
      header.push('<div class="toast-header">')
      header.push(`<strong class="me-auto">${params.attr.title}</strong>`)
      header.push(`<small class="text-body-secondary">${params.attr.caption ?? ''}</small>`)
      if (!params.attr.noDismiss) header.push(await this.buildTag({ tag: 'btnClose', attr: { close: cls } }))
      header.push('</div>')
    }
    const html = [header.join('\n'), `<div class="toast-body">${params.html}</div>`]
    if (header.length === 0 && !params.attr.noDismiss) {
      html.push(await this.buildTag({ tag: 'btnClose', attr: { close: cls, margin: 'all-auto end-2 top-2' } }))
      html.unshift('<div class="d-flex justify-content-between align-items-start">')
      html.push('</div>')
    }
    params.html = html.join('\n')
    params.attr = omit(params.attr, ['title', 'caption'])
  }
}

export default toast
