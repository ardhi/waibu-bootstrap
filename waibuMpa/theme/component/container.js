const baseCls = 'container'

const container = {
  selector: '.' + baseCls,
  handler: async function ({ params }) {
    const { has } = this._
    const attr = params.attr
    if (has(attr, 'responsive')) attr.class.push(`${baseCls}-fluid`)
    else if (has(attr, 'size')) this._getAttr(attr, 'size', baseCls)
    else attr.class.push(baseCls)
    delete attr.responsive
  }
}

export default container
