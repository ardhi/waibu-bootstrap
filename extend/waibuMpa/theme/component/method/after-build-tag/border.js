import { opacities, widths, colors, parseVariant, parseSimple } from './_lib.js'
const sides = ['top', 'end', 'bottom', 'start', 'all']
const variants = ['subtle', 'secondary', 'tertiary']

function border ({ tag, key, params }) {
  if (['table'].includes(tag)) return
  const { uniq } = this.app.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  const borderColors = ['body', 'black', 'white', ...colors]
  let hasSide
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (item === 'side') hasSide = true
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'side': if (sides.includes(val)) params.attr.class.push(`border${value === 'all' ? '' : ('-' + value)}`); break
        case 'width': params.attr.class.push(parseSimple.call(this, { cls: 'border', value, values: widths })); break
        case 'opacity': params.attr.class.push(parseSimple.call(this, { cls: 'border-opacity', value, values: opacities })); break
        case 'color': params.attr.class.push(parseVariant.call(this, { cls: 'border', value, values: borderColors, variants })); break
      }
    }
  }
  if (!hasSide) params.attr.class.unshift('border')
}

export default border
