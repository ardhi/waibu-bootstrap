import { directions, widths } from './_lib.js'

const sides = ['x', 'y', 'all', ...directions]
const sizes = ['0', 'auto', ...widths]

function marginPadding ({ key, params }) {
  for (const item of this.mpa.attrToArray(params.attr[key])) {
    const [side, size] = item.split(':')
    if (sides.includes(side) && (!size || sizes.includes(size))) {
      params.attr.class.push(`${key[0]}${side === 'all' ? '' : side[0]}${size ? ('-' + size) : ''}`)
    }
  }
}

export default marginPadding
