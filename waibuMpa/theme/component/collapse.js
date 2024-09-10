function collectAttr (params, item) {
  const { pick, merge } = this.plugin.app.bajo.lib._
  return merge(pick(params.attr, ['color']), {
    'data-bs-toggle': 'collapse',
    'data-bs-target': item ? ('#' + item.id) : '.multi-collapse'
  })
}

async function collapse (params = {}) {
  const { merge, isString } = this.plugin.app.bajo.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  const items = []
  const $ = this.$
  const contents = this.$(`<div>${params.html}</div>`).children().each(function () {
    const classes = attrToArray(this.attribs.class)
    items.push({
      id: this.attribs.id,
      label: isString(this.attribs.label) ? this.attribs.label : this.attribs.id,
      show: classes.includes('show')
    })
    $(this).removeAttr('label')
    if (params.attr.toggleAll) $(this).addClass('multi-collapse')
  }).parent().html()
  const tag = isString(params.attr.tag) ? params.attr.tag : 'div'
  this._normalizeAttr(params, { tag })
  params.html = []
  for (const item of items) {
    const attr = collectAttr.call(this, params, item)
    params.html.push(await this.buildTag({ tag: 'btn', attr, html: item.label }))
  }
  if (params.attr.toggleAll) {
    const attr = collectAttr.call(this, params)
    params.html.push(await this.buildTag({ tag: 'btn', attr, html: params.req.t('Toggle All') }))
  }
  params.html = params.html.join('\n')
  if (params.attr.group) {
    params.attr.label = !isString(params.attr.group) ? params.req.t('Collapse') : params.attr.group
    params.html = await this.buildTag(merge({}, params, { tag: 'btnGroup' }))
    params.noTag = true
  }
  params.append = contents
}

export default collapse
