import { breakpoints, parseVariant } from './_after-build-tag/_lib.js'
import { buildCol } from './grid-row.js'
const cls = 'col'
const cols = buildCol()
const orders = ['1', '2', '3', '4', '5', 'first', 'last']

function parse (item) {
  if (item === (Object.keys(cols).length + '')) return cls
  const [w, b] = item.split('-').map(i => i.trim())
  if (!b) return cols[w] ? `${cls}-${w}` : (breakpoints.includes(w) ? `${cls}-${w}` : undefined)
  if (!cols[w]) return undefined
  return breakpoints.includes(b) ? `${cls}-${b}${cols[w]}` : `${cls}${cols[w]}`
}

const gridCol = {
  selector: `[class^=${cls}]`,
  handler: async function (params = {}) {
    const { map, without, isString } = this.plugin.app.bajo.lib._
    const { attrToArray } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div' })
    if (params.attr.break) {
      const ext = breakpoints.includes(params.attr.break) ? `d-none d-${params.attr.break}-block` : ''
      params.attr.class.push('w-100', ext)
      params.html = ''
      return
    }
    let cols = attrToArray(params.attr.col)
    cols = without(map(cols, c => {
      return parse.call(this, c)
    }), undefined)
    if (cols.length === 0) cols = [cls]
    params.attr.class.push(...cols)
    if (isString(params.attr.order)) params.attr.class.push(parseVariant.call(this, { cls: 'order', value: params.attr.order, values: orders, variants: breakpoints, prepend: true }))
    if (isString(params.attr.offset)) params.attr.class.push(parseVariant.call(this, { cls: 'offset', value: params.attr.offset, values: without(Object.keys(cols), 'auto'), variants: breakpoints, prepend: true }))
  }
}

export default gridCol
