async function fieldset (params = {}) {
  const { omit } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params, { tag: 'fieldset' })
  if (!params.attr.legendType) params.attr.legendType = '6-display'
  const group = groupAttrs(params.attr, ['grid', 'legend', 'card'])
  if (group.grid && !params.attr.card && !group.grid.margin) group.grid.margin = 'bottom-3'
  if (group.grid) params.html = await this.buildTag({ tag: 'gridRow', attr: group.grid, html: params.html })
  if (group.card) {
    if (!group.card.margin) group.card.margin = 'bottom-4'
    let sentence = `
      <c:card-header>
        <c:card-title content="${params.attr.legend}" />
      </c:card-header>
      <c:card-body>${params.html}</c:card-body>
    `
    if (!params.attr.legend) {
      sentence = `
        <c:card-body>${params.html}</c:card-body>
      `
    }
    const html = await this.buildSentence(sentence)
    params.html = await this.buildTag({ tag: 'card', attr: group.card, html })
  } else {
    const legend = params.attr.legend ? (await this.buildTag({ tag: 'heading', attr: group.legend, html: group._.legend })) : ''
    params.html = `${legend}\n${params.html}`
  }
  params.attr = omit(group._, ['legend', 'card'])
}

export default fieldset
