const cls = 'accordion-item'

const accordionItem = {
  selector: '.' + cls,
  handler: async function ({ params, reply, el } = {}) {
    const { generateId } = this.plugin.app.bajo
    const { has } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    const id = has(params.attr, 'id') ? params.attr.id : generateId()
    const showOnStart = !!has(params.attr, 'show-on-start')
    const header = ['<h2 class="accordion-header">',
      `<button class="accordion-button${showOnStart ? '' : ' collapsed'}"`,
      `type="button" data-bs-toggle="collapse" data-bs-target="#${id}"`,
      `aria-expanded="${showOnStart}"`,
      `aria-controls="${id}">${params.attr.header}</button></h2>`]
    const details = [`<div id="${id}" class="accordion-collapse collapse${showOnStart ? ' show' : ''}">`,
      `<div class="accordion-body">${params.html}</div></div>`]
    params.html = `${header.join(' ')}\n${details.join(' ')}`
    delete params.attr['show-on-start']
  }
}

export default accordionItem
