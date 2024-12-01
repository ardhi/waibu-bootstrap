export function buildCol () {
  const width = { auto: '-auto' }
  for (let i = 1; i <= 12; i++) width[i] = `-${i}`
  return width
}
const cls = 'row'
const col = buildCol()

async function gridRow () {
  return class GridRow extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
      const item = col[this.params.attr.col]
      if (item) this.params.attr.class.push(`row-cols${item}`)
    }
  }
}

export default gridRow
