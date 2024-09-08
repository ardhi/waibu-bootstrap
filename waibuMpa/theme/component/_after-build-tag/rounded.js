import { aligns, widths, parseSimple } from './_lib.js'
const types = ['circle', 'pill', ...aligns]

function rounded ({ key, params }) {
  const { uniq } = this.plugin.app.bajo.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  let hasType
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (item === 'type') hasType = true
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'type': if (types.includes(val)) params.attr.class.push(`rounded${val === 'all' ? '' : ('-' + val)}`); break
        case 'width': params.attr.class.push(parseSimple.call(this, { cls: 'rounded', value, values: widths })); break
      }
    }
  }
  if (!hasType) params.attr.class.unshift('rounded')
}

export default rounded
