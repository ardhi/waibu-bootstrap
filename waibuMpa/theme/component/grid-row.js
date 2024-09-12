import { breakpoints, widths, parseVariant } from './_after-build-tag/_lib.js'

export function buildCol () {
  const width = { auto: '-auto' }
  for (let i = 1; i < 12; i++) width[i] = `-${i}`
  return width
}
const cls = 'row'
const col = buildCol()
const xwidths = ['0', ...widths]
const prefixes = ['x', 'y', '']

const gridRow = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const { attrToArray } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', cls })
    const item = col[params.attr.cols]
    if (item) params.attr.class.push(`row-cols${item}`)
    if (isString(params.attr.gutter)) {
      const items = attrToArray(params.attr.gutter)
      for (const item of items) {
        let [w, b] = item.split(':')
        if (!b) {
          b = w
          w = ''
        }
        if (!prefixes.includes(w)) break
        params.attr.class.push(parseVariant.call(this, { cls: `g${w}`, value: b, values: xwidths, variants: breakpoints, prepend: true }))
      }
    }
  }
}

export default gridRow
