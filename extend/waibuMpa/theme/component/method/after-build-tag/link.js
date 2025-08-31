import { opacities, parseVariant, colors } from './_lib.js'
const variants = ['emphasis', 'secondary', 'tertiary']
const offsets = ['1', '2', '3']
const ovariants = ['hover']

function link ({ key, params }) {
  const { uniq } = this.app.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  const linkColors = ['body', 'black', 'white', ...colors]
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'underline-opacity':
        case 'opacity': params.attr.class.push(parseVariant.call(this, { cls: `link-${item}`, value, values: opacities, variants })); break
        case 'underline-offset': params.attr.class.push(parseVariant.call(this, { cls: `link-${item}`, value, values: offsets, variants: ovariants })); break
        case 'underline-color':
        case 'color': params.attr.class.push(parseVariant.call(this, { cls: `link${item.includes('underline') ? 'underline-' : ''}`, value, values: linkColors, variants })); break
      }
    }
  }
}

export default link
