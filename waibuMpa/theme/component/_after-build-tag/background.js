import { opacities } from './_lib.js'
const directs = ['gradient']
const variants = ['subtle', 'secondary', 'tertiary']

function background ({ key, params }) {
  const { uniq, cloneDeep, isEmpty } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const colors = cloneDeep(this.getAttrValues.variant)
  colors.push('body', 'black', 'white')
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (!value && directs.includes(item)) params.attr.class.push(`bg-${item}`)
    else {
      for (const val of uniq((value ?? '').split(','))) {
        switch (item) {
          case 'opacity': if (opacities.includes(val)) params.attr.class.push(`bg-opacity-${val}`); break
          case 'color': {
            const [core, variant] = val.split('-')
            let v = ''
            if (colors.includes(core)) v += `bg-${core}`
            if (variants.includes(variant)) v += `-${variant}`
            if (!isEmpty(v)) params.attr.class.push(v)
            break
          }
        }
      }
    }
  }
}

export default background
