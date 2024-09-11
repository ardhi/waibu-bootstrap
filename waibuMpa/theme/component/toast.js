const cls = 'toast'

const toast = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { cls, tag: 'div', role: 'alert', ariaLive: 'assertive', ariaAtomic: 'true' })
    const header = []
    if (isString(params.attr.title)) {
      header.push('<div class="toast-header">')
      header.push(`<strong>${params.attr.title}</strong>`)
      if (isString(params.attr.caption)) header.push(`<small>${params.attr.caption}</small>`)
      if (!params.attr.noDismiss) header.push(await this.buildTag({ tag: 'btnClose', attr: { close: cls }, req: params.req }))
      header.push('</div>')
    }
    const html = [header.join('\n'), `<div class="toast-body">${params.html}`]
    if (header.length === 0 && !params.attr.noDismiss) {
      html.push(await this.buildTag({ tag: 'btnClose', attr: { close: cls }, req: params.req }))
    }
    html.push('</div>')
    params.html = html.join('\n')
    params.attr = omit(params.attr, ['title', 'caption'])
  }
}

export default toast
