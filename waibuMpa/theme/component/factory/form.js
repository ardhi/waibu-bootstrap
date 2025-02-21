async function form () {
  return class Form extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'form' })
      if (!this.params.attr.method) this.params.attr.method = 'POST'
    }

    async build () {
      this.component.locals.form = this.component.locals.form ?? {}
      const { pascalCase } = this.plugin.app.bajo
      const { isEmpty, omit } = this.plugin.app.bajo.lib._
      const { attrToArray } = this.plugin.app.waibuMpa
      const { groupAttrs } = this.plugin.app.waibuMpa
      if (this.params.attr.referer) {
        const referer = `<input type="hidden" name="referer" value="${this.component.locals.form.referer ?? ''}" />`
        this.params.html = `${referer}\n${this.params.html}`
      }
      const group = groupAttrs(this.params.attr, ['grid'])
      this.params.attr = group._
      if (group.grid) this.params.html = await this.component.buildTag({ tag: 'gridRow', attr: group.grid, html: this.params.html })
      if (this.params.attr.button === true) this.params.attr.button = 'reset:reset-link submit:submit-primary'
      if (this.params.attr.button) {
        const rBtns = []
        const lBtns = []
        const attrs = attrToArray(this.params.attr.button)
        for (const _attr of attrs) {
          const [type, val] = _attr.split(':')
          const [label, color] = (val ?? '').split('-')
          if (!['submit', 'reset', 'button'].includes(type)) continue
          const attr = { type, color: color ?? 'secondary', margin: 'start-2' }
          const html = this.component.req.t(isEmpty(label) ? pascalCase(type) : label)
          rBtns.push(await this.component.buildTag({ tag: 'btn', attr, html }))
        }
        if (this.params.attr.resetValidation && this.component.locals.error) {
          const attr = { href: '#', size: 'sm', 'x-data': true, '@click': 'wbs.invalidateForm', icon: 'remove', color: 'link' }
          lBtns.push(await this.component.buildTag({ tag: 'btn', attr, html: this.component.req.t('Clear') }))
        }
        this.params.html += `<div class="d-flex justify-content-between my-3 ms-1 me-3"><div>${lBtns.join('\n')}</div><div>${rBtns.join('\n')}</div></div>`
      }
      this.params.attr = omit(this.params.attr, ['button', 'referer', 'resetValidation'])
    }
  }
}

export default form
