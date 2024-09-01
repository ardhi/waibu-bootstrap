import { breakpoints, opacities, heights, parseVariant } from './_lib.js'

const decorations = ['underline', 'line-through', 'none']
const transforms = ['lowercase', 'uppercase', 'capitalize', 'monospace']
const alignments = ['start', 'center', 'break', 'reset', 'end']
const directs = ['wrap', 'nowrap', 'mark', 'small']
const variants = ['emphasis', 'secondary', 'tertiary']

function text ({ key, params }) {
  const { uniq, cloneDeep } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const colors = cloneDeep(this.getAttrValues.color)
  colors.push('body', 'black', 'white')
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (!value && directs.includes(item)) params.attr.class.push(['mark', 'small'].includes(item) ? item : `text-${item}`)
    else {
      for (const val of uniq((value ?? '').split(','))) {
        switch (item) {
          case 'decoration': if (decorations.includes(val)) params.attr.class.push(`text-decoration-${val}`); break
          case 'line-height': if (heights.includes(val)) params.attr.class.push(`lh-${val}`); break
          case 'transform': if (transforms.includes(val)) params.attr.class.push(`text-${val}`); break
          case 'align': params.attr.class.push(parseVariant.call(this, { cls: 'text', value: val, values: alignments, variants: breakpoints, prepend: true })); break
          case 'opacity': if (opacities.includes(val)) params.attr.class.push(`text-opacity-${val}`); break
          case 'background': if (colors.includes(val)) params.attr.class.push(`text-bg-${val}`); break
          case 'color': params.attr.class.push(parseVariant.call(this, { cls: 'text', value: val, values: colors, variants })); break
        }
      }
    }
  }
}

export default text
