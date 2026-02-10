import { aligns, widths, parseSimple } from './_lib.js'
const types = ['circle', 'pill', ...aligns]

function rounded ({ key, params }) {
  const { uniq } = this.app.lib._
  if (params.attr.rounded === true) {
    params.attr.class.push('rounded')
    return
  }
  const attrs = this.app.waibuMpa.attrToArray(params.attr[key])
  let hasType
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (item === 'type') hasType = true
    for (const value of uniq((val ?? '').split(' '))) {
      const [main, alt] = value.split('-')
      switch (item) {
        case 'type': if (types.includes(main)) params.attr.class.push(`rounded${main === 'all' ? '' : ('-' + main)}${alt ? ('-' + alt) : ''}`); break
        case 'width': params.attr.class.push(parseSimple.call(this, { cls: 'rounded', value, values: widths })); break
      }
    }
  }
  if (!hasType) params.attr.class.unshift('rounded')
}

export default rounded
