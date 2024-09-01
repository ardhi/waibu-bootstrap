import { opacities, widths } from './_lib.js'
const sides = ['top', 'end', 'bottom', 'start', 'all']
const variants = ['subtle', 'secondary', 'tertiary']

function border ({ key, params }) {
  const { uniq, cloneDeep, isEmpty } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const colors = cloneDeep(this.getAttrValues.color)
  colors.push('body', 'black', 'white')
  let hasSide
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (item === 'side') hasSide = true
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'side': if (sides.includes(val)) params.attr.class.push(`border${val === 'all' ? '' : ('-' + val)}`); break
        case 'width': if (widths.includes(val)) params.attr.class.push(`border-${val}`); break
        case 'opacity': if (opacities.includes(val)) params.attr.class.push(`border-opacity-${val}`); break
        case 'color': {
          const [core, variant] = val.split('-')
          let v = ''
          if (colors.includes(core)) v += `border-${core}`
          if (variants.includes(variant)) v += `-${variant}`
          if (!isEmpty(v)) params.attr.class.push(v)
          break
        }
      }
    }
  }
  if (!hasSide) params.attr.class.unshift('border')
}

export default border
