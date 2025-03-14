async function fieldset () {
  return class Fieldset extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'fieldset' })
      if (!this.params.attr.legendType) this.params.attr.legendType = '5'
    }

    build = async () => {
      const { omit } = this.plugin.lib._
      const { groupAttrs } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['grid', 'legend', 'card'])
      if (group.grid && !this.params.attr.card && !group.grid.margin) group.grid.margin = 'bottom-3'
      if (group.grid) this.params.html = await this.component.buildTag({ tag: 'gridRow', attr: group.grid, html: this.params.html })
      if (group.card) {
        if (!group.card.margin) group.card.margin = 'bottom-4'
        let sentence = `
          <c:card-header>
            <c:card-title content="${this.params.attr.legend}" />
          </c:card-header>
          <c:card-body>${this.params.html}</c:card-body>
        `
        if (!this.params.attr.legend) {
          sentence = `
            <c:card-body>${this.params.html}</c:card-body>
          `
        }
        const html = await this.component.buildSentence(sentence)
        this.params.html = await this.component.buildTag({ tag: 'card', attr: group.card, html })
      } else {
        const legend = this.params.attr.legend ? (await this.component.buildTag({ tag: 'heading', attr: group.legend, html: group._.legend })) : ''
        this.params.html = `${legend}\n${this.params.html}`
      }
      this.params.attr = omit(group._, ['legend', 'card'])
    }
  }
}

export default fieldset
