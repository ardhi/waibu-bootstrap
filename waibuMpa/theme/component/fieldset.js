async function fieldset (params = {}) {
  const { omit } = this.plugin.app.bajo.lib._
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params, { tag: 'fieldset' })
  params.attr.legend = params.attr.legend ?? this.req.t('Fieldset')
  if (!params.attr.legendType) params.attr.legendType = '6-display'
  const group = groupAttrs(params.attr, ['grid', 'legend'])
  if (group.grid) params.html = await this.buildTag({ tag: 'gridRow', attr: group.grid, html: params.html })
  const legend = await this.buildTag({ tag: 'heading', attr: group.legend, html: group._.legend })
  params.html = `${legend}\n${params.html}`
  params.attr = omit(group._, ['legend'])
}

export default fieldset
