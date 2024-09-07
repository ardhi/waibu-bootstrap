const cls = 'accordion-item'

const accordionItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { generateId } = this.plugin.app.bajo
    const { isString } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    const id = isString(params.attr.id) ? params.attr.id : generateId()
    const header = ['<h2 class="accordion-header">',
      `<button class="accordion-button${params.attr.showOnStart ? '' : ' collapsed'}"`,
      `type="button" data-bs-toggle="collapse" data-bs-target="#${id}"`,
      `aria-expanded="${params.attr.showOnStart}"`,
      `aria-controls="${id}">${params.attr.header}</button></h2>`]
    const details = [`<div id="${id}" class="accordion-collapse collapse${params.attr.showOnStart ? ' show' : ''}">`,
      `<div class="accordion-body">${params.html}</div></div>`]
    params.html = `${header.join(' ')}\n${details.join(' ')}`
  }
}

export default accordionItem
