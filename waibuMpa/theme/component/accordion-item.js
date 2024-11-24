const cls = 'accordion-item'

const accordionItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit } = this.plugin.app.bajo.lib._
    const { groupAttrs } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    params.attr.body = params.attr.body ?? true
    const group = groupAttrs(params.attr, ['body'])
    if (!group.body.noPadding) group.body.class.push('accordion-body')
    const header = ['<h2 class="accordion-header">',
      `<button class="${params.attr.narrowHeader ? 'px-3 py-2 ' : ''}accordion-button${params.attr.showOnStart ? '' : ' collapsed'}"`,
      `type="button" data-bs-toggle="collapse" data-bs-target="#${params.attr.id}"`,
      `aria-expanded="${params.attr.showOnStart}"`,
      `aria-controls="${params.attr.id}">${params.attr.header}</button></h2>`]
    const body = await this.buildTag({ tag: 'div', attr: group.body, html: params.html })
    const details = [`<div id="${params.attr.id}" class="accordion-collapse collapse${params.attr.showOnStart ? ' show' : ''}">`,
      body, '</div']
    params.html = `${header.join(' ')}\n${details.join(' ')}`
    params.attr = omit(params.attr, ['id', 'noPadding', 'narrowHeader', 'bodyClass'])
  }
}

export default accordionItem
