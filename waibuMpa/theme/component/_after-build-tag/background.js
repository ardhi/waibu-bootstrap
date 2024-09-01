import { opacities, parseVariant } from './_lib.js'

const directs = ['gradient']
const variants = ['subtle', 'secondary', 'tertiary']

function background ({ key, params }) {
  const { uniq, cloneDeep } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const colors = cloneDeep(this.getAttrValues.color)
  colors.push('body', 'black', 'white')
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (!value && directs.includes(item)) params.attr.class.push(`bg-${item}`)
    else {
      for (const val of uniq((value ?? '').split(','))) {
        switch (item) {
          case 'opacity': if (opacities.includes(val)) params.attr.class.push(`bg-opacity-${val}`); break
          case 'color': params.attr.class.push(parseVariant.call(this, { cls: 'bg', value: val, values: colors, variants })); break
        }
      }
    }
  }
}

export default background
