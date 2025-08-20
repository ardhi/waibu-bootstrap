import { aligns, widths, breakpoints } from './_lib.js'

const sides = ['x', 'y', 'all', ...aligns]
const sizes = ['0', 'auto', ...widths]

function marginPadding ({ key, params }) {
  for (const item of this.plugin.app.waibuMpa.attrToArray(params.attr[key])) {
    let [side, size, bp] = item.split('-')
    if (bp && !breakpoints.includes(bp)) bp = undefined
    if (sides.includes(side) && (!size || sizes.includes(size))) {
      params.attr.class.push(`${key[0]}${side === 'all' ? '' : side[0]}${bp ? ('-' + bp) : ''}${size ? ('-' + size) : ''}`)
    }
  }
}

export default marginPadding
