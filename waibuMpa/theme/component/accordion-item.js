const cls = 'accordion-item'

const accordionItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    const header = ['<h2 class="accordion-header">',
      `<button class="${params.attr.narrowHeader ? 'px-3 py-2 ' : ''}accordion-button${params.attr.showOnStart ? '' : ' collapsed'}"`,
      `type="button" data-bs-toggle="collapse" data-bs-target="#${params.attr.id}"`,
      `aria-expanded="${params.attr.showOnStart}"`,
      `aria-controls="${params.attr.id}">${params.attr.header}</button></h2>`]
    const details = [`<div id="${params.attr.id}" class="accordion-collapse collapse${params.attr.showOnStart ? ' show' : ''}">`,
      `<div${params.attr.noPadding ? '' : ' class="accordion-body"'}>${params.html}</div></div>`]
    params.html = `${header.join(' ')}\n${details.join(' ')}`
    params.attr = omit(params.attr, ['id', 'noPadding', 'narrowHeader'])
  }
}

export default accordionItem
