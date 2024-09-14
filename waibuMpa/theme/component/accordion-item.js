const cls = 'accordion-item'

const accordionItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls, autoId: true })
    const header = ['<h2 class="accordion-header">',
      `<button class="accordion-button${params.attr.showOnStart ? '' : ' collapsed'}"`,
      `type="button" data-bs-toggle="collapse" data-bs-target="#${params.attr.id}"`,
      `aria-expanded="${params.attr.showOnStart}"`,
      `aria-controls="${params.attr.id}">${params.attr.header}</button></h2>`]
    const details = [`<div id="${params.attr.id}" class="accordion-collapse collapse${params.attr.showOnStart ? ' show' : ''}">`,
      `<div class="accordion-body">${params.html}</div></div>`]
    params.html = `${header.join(' ')}\n${details.join(' ')}`
    delete params.attr.id
  }
}

export default accordionItem
