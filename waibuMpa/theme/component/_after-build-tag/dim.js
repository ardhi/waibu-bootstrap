import { dims } from './_lib.js'

function dim ({ key, params }) {
  const { uniq } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'height':
        case 'width': {
          if (val === 'max') params.attr.class.push(`m${val[0]}-100`)
          else if (val === 'viewport') params.attr.class.push(`v${val[0]}-100`)
          else if (val === 'min-viewport') params.attr.class.push(`min-v${val[0]}-100`)
          else if (dims.includes(value)) params.attr.class.push(`${val[0]}-${val}`)
          break
        }
      }
    }
  }
}

export default dim
