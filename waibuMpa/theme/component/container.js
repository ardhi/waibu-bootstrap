const baseClass = 'container'

const container = {
  selector: '.' + baseClass,
  handler: async function ({ params }) {
    const { has } = this._
    const attr = params.attr
    if (has(attr, 'responsive')) attr.class.push(`${baseClass}-fluid`)
    else if (has(attr, 'size')) this._getAttr(attr, 'size', baseClass)
    else attr.class.push(baseClass)
    delete attr.responsive
  }
}

export default container
