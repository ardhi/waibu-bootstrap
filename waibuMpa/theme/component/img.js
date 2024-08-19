const baseCls = 'img'

const img = {
  selector: baseCls,
  handler: async function img ({ params, reply } = {}) {
    const { has, omit } = this._
    params.tag = 'img'
    const attr = params.attr
    if (has(attr, 'responsive')) attr.class.push('img-fluid')
    if (has(attr, 'rounded')) attr.class.push('rounded')
    if (has(attr, 'thumbnail')) attr.class.push('img-thumbnail')
    for (const item of ['h-align']) {
      this._getAttr(attr, item, baseCls)
    }
    params.attr = omit(attr, ['responsive', 'rounded', 'thumbnail'])
  }
}

export default img
