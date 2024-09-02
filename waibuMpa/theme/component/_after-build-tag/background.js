import { opacities, parseVariant, parseSimple, colors } from './_lib.js'

const directs = ['gradient']
const variants = ['subtle', 'secondary', 'tertiary']

function background ({ key, params }) {
  const { uniq } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const bgColors = ['body', 'black', 'white', ...colors]
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (!val && directs.includes(item)) params.attr.class.push(`bg-${item}`)
    else {
      for (const value of uniq((val ?? '').split(','))) {
        switch (item) {
          case 'opacity': params.attr.class.push(parseSimple.call(this, { cls: 'bg-opacity', value, values: opacities })); break
          case 'color': params.attr.class.push(parseVariant.call(this, { cls: 'bg', value, values: bgColors, variants })); break
        }
      }
    }
  }
}

export default background
