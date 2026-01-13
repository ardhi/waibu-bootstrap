import { breakpoints, parseVariant } from '../method/after-build-tag/_lib.js'
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

async function gridCol () {
  return class GridCol extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = `[class^=${cls}]`
      this.component.normalizeAttr(this.params, { tag: 'div' })
    }

    build = async () => {
      const { map, without, isString } = this.app.lib._
      const { attrToArray } = this.app.waibuMpa
      if (this.params.attr.break) {
        const ext = breakpoints.includes(this.params.attr.break) ? `d-none d-${this.params.attr.break}-block` : ''
        this.params.attr.class.push('w-100', ext)
        this.params.html = ''
        return
      }
      let cols = attrToArray(this.params.attr.col)
      cols = without(map(cols, c => {
        return parse.call(this, c)
      }), undefined)
      if (cols.length === 0) cols = [cls]
      this.params.attr.class.push(...cols)
      if (isString(this.params.attr.order)) this.params.attr.class.push(parseVariant.call(this, { cls: 'order', value: this.params.attr.order, values: orders, variants: breakpoints, prepend: true }))
      if (isString(this.params.attr.offset)) this.params.attr.class.push(parseVariant.call(this, { cls: 'offset', value: this.params.attr.offset, values: without(Object.keys(cols), 'auto'), variants: breakpoints, prepend: true }))
    }
  }
}

export default gridCol
