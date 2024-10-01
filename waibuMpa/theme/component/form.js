async function form (params = {}) {
  this.locals.form = this.locals.form ?? {}
  const { pascalCase } = this.plugin.app.bajo
  const { isEmpty, omit } = this.plugin.app.bajo.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params, { tag: 'form' })
  if (!params.attr.method) params.attr.method = 'POST'
  if (!params.attr.action) params.attr.action = this.req.url.split('?')[0].split('#')[0]
  if (params.attr.referer) {
    const referer = `<input type="hidden" name="referer" value="${this.locals.form.referer ?? ''}" />`
    params.html = `${referer}\n${params.html}`
  }
  const group = groupAttrs(params.attr, ['grid'])
  params.attr = group._
  if (group.grid) params.html = await this.buildTag({ tag: 'gridRow', attr: group.grid, html: params.html })
  if (params.attr.button === true) params.attr.button = 'reset:Reset-link submit:Submit-primary'
  if (params.attr.button) {
    const rBtns = []
    const lBtns = []
    const attrs = attrToArray(params.attr.button)
    for (const _attr of attrs) {
      const [type, val] = _attr.split(':')
      const [label, color] = (val ?? '').split('-')
      if (!['submit', 'reset', 'button'].includes(type)) continue
      const attr = { type, color: color ?? 'secondary', margin: 'start-2' }
      const html = this.req.t(isEmpty(label) ? pascalCase(type) : label)
      rBtns.push(await this.buildTag({ tag: 'btn', attr, html }))
    }
    if (params.attr.resetValidation && this.locals.error) {
      const attr = { href: '#', size: 'sm', 'x-data': true, '@click': 'wbs.invalidateForm', icon: 'remove', color: 'link' }
      lBtns.push(await this.buildTag({ tag: 'btn', attr, html: this.req.t('Clear') }))
    }
    params.html += `<div class="d-flex justify-content-between my-3 ms-1 me-3"><div>${lBtns.join('\n')}</div><div>${rBtns.join('\n')}</div></div>`
  }
  params.attr = omit(params.attr, ['button', 'referer', 'resetValidation'])
}

export default form
