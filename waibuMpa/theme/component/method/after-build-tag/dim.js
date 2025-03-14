import { dims } from './_lib.js'

function dim ({ key, params }) {
  const { uniq } = this.plugin.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'height':
        case 'width': {
          if (value === 'max') params.attr.class.push(`m${item[0]}-100`)
          else if (value === 'viewport') params.attr.class.push(`v${item[0]}-100`)
          else if (value === 'min-viewport') params.attr.class.push(`min-v${item[0]}-100`)
          else if (dims.includes(value)) params.attr.class.push(`${item[0]}-${value}`)
          break
        }
      }
    }
  }
}

export default dim
