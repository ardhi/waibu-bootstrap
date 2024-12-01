function collectAttr (params, item) {
  const { pick, merge } = this.plugin.app.bajo.lib._
  return merge(pick(this.params.attr, ['color']), {
    'data-bs-toggle': 'collapse',
    'data-bs-target': item ? ('#' + item.id) : `.multi-collapse.${this.params.attr.toggleAll}`
  })
}

async function collapse () {
  return class Collapse extends this.baseFactory {
    async build () {
      const { generateId } = this.plugin.app.bajo
      const { merge, isString } = this.plugin.app.bajo.lib._
      const { attrToArray } = this.plugin.app.waibuMpa
      const items = []
      const { $ } = this.component
      const me = this
      if (this.params.attr.toggleAll) this.params.attr.toggleAll = generateId('alpha')
      const contents = $(`<div>${this.params.html}</div>`).children().each(function () {
        const classes = attrToArray(this.attribs.class)
        items.push({
          id: this.attribs.id,
          label: isString(this.attribs.caption) ? this.attribs.caption : this.attribs.id,
          show: classes.includes('show')
        })
        $(this).removeAttr('caption')
        if (me.params.attr.toggleAll) $(this).addClass('multi-collapse').addClass(me.params.attr.toggleAll)
      }).parent().html()
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'div'
      this.component.normalizeAttr(this.params, { tag })
      this.params.html = []
      for (const item of items) {
        const attr = collectAttr.call(this, this.params, item)
        this.params.html.push(await this.component.buildTag({ tag: 'btn', attr, html: item.label }))
      }
      if (this.params.attr.toggleAll) {
        const attr = collectAttr.call(this, this.params)
        this.params.html.push(await this.component.buildTag({ tag: 'btn', attr, html: this.component.req.t('Toggle All') }))
      }
      this.params.html = this.params.html.join('\n')
      if (this.params.attr.group) {
        this.params.attr.label = !isString(this.params.attr.group) ? this.component.req.t('Collapse') : this.params.attr.group
        this.params.html = await this.component.buildTag(merge({}, this.params, { tag: 'btnGroup' }))
        this.params.noTag = true
      }
      this.params.append = contents
    }
  }
}

export default collapse
