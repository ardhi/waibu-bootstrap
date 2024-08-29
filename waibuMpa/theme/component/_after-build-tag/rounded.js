import { directions, widths } from './_lib.js'
const types = ['circle', 'pill', ...directions]

function rounded ({ key, params }) {
  const { uniq } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  let hasType
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (item === 'type') hasType = true
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'type': if (types.includes(val)) params.attr.class.push(`rounded${val === 'all' ? '' : ('-' + val)}`); break
        case 'width': if (widths.includes(val)) params.attr.class.push(`rounded-${val}`); break
      }
    }
  }
  if (!hasType) params.attr.class.unshift('rounded')
}

export default rounded
