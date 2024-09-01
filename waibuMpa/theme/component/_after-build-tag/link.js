import { opacities } from './_lib.js'
const variants = ['emphasis', 'secondary', 'tertiary']
const offsets = ['1', '2', '3']
const ovariants = ['hover']

function link ({ key, params }) {
  const { uniq, cloneDeep, isEmpty } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const colors = cloneDeep(this.getAttrValues.color)
  colors.push('body', 'black', 'white')
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'underline-opacity':
        case 'opacity': {
          const [core, variant] = val.split('-')
          let v = ''
          if (opacities.includes(core)) v += `link-${item}-${core}`
          if (ovariants.includes(variant)) v += `-${variant}`
          if (!isEmpty(v)) params.attr.class.push(v)
          break
        }
        case 'underline-offset': {
          const [core, variant] = val.split('-')
          let v = ''
          if (offsets.includes(core)) v += `link-${item}-${core}`
          if (ovariants.includes(variant)) v += `-${variant}`
          if (!isEmpty(v)) params.attr.class.push(v)
          break
        }
        case 'underline-color':
        case 'color': {
          const [core, variant] = val.split('-')
          let v = ''
          if (colors.includes(core)) v += `link-${item.includes('underline') ? 'underline-' : ''}${core}`
          if (variants.includes(variant)) v += `-${variant}`
          if (!isEmpty(v)) params.attr.class.push(v)
          break
        }
      }
    }
  }
}

export default link
