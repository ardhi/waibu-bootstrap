const cls = 'accordion-item'

async function accordionItem () {
  return class AccordionItem extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, autoId: true })
      this.params.attr.body = this.params.attr.body ?? true
    }

    build = async () => {
      const { omit, without } = this.plugin.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['body'])
      if (!group.body.noPadding) group.body.class.push('accordion-body')
      const clsList = without(this.params.attr.class, cls)
      const header = ['<h2 class="accordion-header">',
        `<button class="${this.params.attr.narrowHeader ? 'px-3 py-2 ' : ''}accordion-button${this.params.attr.showOnStart ? '' : ' collapsed'}"`,
        `type="button" data-bs-toggle="collapse" data-bs-target="#${this.params.attr.id}"`,
        `aria-expanded="${this.params.attr.showOnStart}"`,
        'x-data',
        `@click="$dispatch('accordion-item', { id: $el.closest('.accordion').id, cls: '${clsList.join(' ')}' })"`,
        `aria-controls="${this.params.attr.id}">${this.params.attr.header}</button></h2>`]
      const body = await this.component.buildTag({ tag: 'div', attr: group.body, html: this.params.html })
      const details = [`<div id="${this.params.attr.id}" class="accordion-collapse collapse${this.params.attr.showOnStart ? ' show' : ''}">`,
        body, '</div']
      this.params.html = `${header.join(' ')}\n${details.join(' ')}`
      this.params.attr = omit(this.params.attr, ['id', 'noPadding', 'narrowHeader', 'bodyClass'])
    }
  }
}

export default accordionItem
