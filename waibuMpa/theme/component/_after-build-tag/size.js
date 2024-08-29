import { sizes } from './_lib.js'

function size ({ key, params }) {
  const { uniq } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'height':
        case 'width': {
          if (value === 'max') params.attr.class.push(`m${value[0]}-100`)
          else if (value === 'viewport') params.attr.class.push(`v${value[0]}-100`)
          else if (value === 'min-viewport') params.attr.class.push(`min-v${value[0]}-100`)
          else if (sizes.includes(val)) params.attr.class.push(`${value[0]}-${val}`)
          break
        }
      }
    }
  }
}

export default size
