const cls = 'collapse'

const collapse = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    const { generateId } = this.plugin.app.bajo
    const { groupAttrs } = this.mpa

    const attr = groupAttrs(params.attr, ['trigger'])
    params.noTag = true
    attr._.class.push(cls)
    attr._.id = has(attr._, 'id') ? attr._.id : generateId()
    let btn
    if (has(attr._, 'trigger')) {
      const wrap = has(attr.trigger, 'wrapper') ? attr.trigger.wrapper : 'p'
      const prepend = `<${wrap}>`
      const append = `</${wrap}>`
      attr.trigger['data-bs-toggle'] = 'collapse'
      attr.trigger['data-bs-target'] = '#' + attr._.id
      btn = await this.buildTag({ tag: 'btn', params: { prepend, append, attr: attr.trigger, html: attr._.trigger } })
    }
    const collapse = await this.buildTag({ tag: 'div', params: { attr: attr._, html: params.html } })

    const items = [collapse]
    if (btn) items.unshift(btn)
    params.html = items.join('\n')
  }
}

export default collapse
