const baseCls = 'table'

const table = {
  selector: '.' + baseCls,
  handler: async function ({ params }) {
    const { has, omit } = this._
    params.tag = 'table'
    const attr = params.attr
    attr.class.push(baseCls)
    if (has(attr, 'border')) {
      if (attr.border === 'none') attr.class.push('table-borderless')
      else attr.class.push('table-bordered')
    }
    if (has(attr, 'strip')) {
      if (attr.strip === 'col') attr.class.push('table-striped-columns')
      else attr.class.push('table-striped')
    }
    if (has(attr, 'hover')) attr.class.push('table-hover')
    for (const item of ['variant', 'size', 'v-align']) {
      this._getAttr(attr, item, baseCls)
    }
    if (has(attr, 'responsive')) {
      let cls = `${baseCls}-responsive`
      if (attr.responsive) cls += '-' + attr.responsive
      params.prepend = `<div class="${cls}">`
      params.append = '</div>'
    }
    params.attr = omit(attr, ['border', 'strip', 'hover', 'responsive'])
  }
}

export default table
