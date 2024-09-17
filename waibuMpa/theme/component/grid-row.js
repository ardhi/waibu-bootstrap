export function buildCol () {
  const width = { auto: '-auto' }
  for (let i = 1; i < 12; i++) width[i] = `-${i}`
  return width
}
const cls = 'row'
const col = buildCol()

const gridRow = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'div', cls })
    const item = col[params.attr.col]
    if (item) params.attr.class.push(`row-cols${item}`)
  }
}

export default gridRow
