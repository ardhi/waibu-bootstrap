async function fieldset (params = {}) {
  const { omit } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params, { tag: 'fieldset' })
  params.attr.legend = params.attr.legend ?? 'false'
  if (params.attr.legend === 'false') delete params.attr.legend
  if (!params.attr.legendType) params.attr.legendType = '6-display'
  const group = groupAttrs(params.attr, ['grid', 'legend'])
  if (group.grid && !group.grid.margin) group.grid.margin = 'bottom-2'
  if (group.grid) params.html = await this.buildTag({ tag: 'gridRow', attr: group.grid, html: params.html })
  const legend = params.attr.legend ? (await this.buildTag({ tag: 'heading', attr: group.legend, html: group._.legend })) : ''
  params.html = `${legend}\n${params.html}`
  params.attr = omit(group._, ['legend'])
}

export default fieldset
