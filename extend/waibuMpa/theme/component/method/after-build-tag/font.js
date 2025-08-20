import { levels, weights, fstyles, parseSimple } from './_lib.js'

function font ({ key, params }) {
  const { uniq } = this.plugin.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'monospace': params.attr.class.push(`font-${item}`); break
        case 'size': params.attr.class.push(parseSimple.call(this, { cls: 'fs', value, values: levels })); break
        case 'weight': params.attr.class.push(parseSimple.call(this, { cls: 'fw', value, values: weights })); break
        case 'style': params.attr.class.push(parseSimple.call(this, { cls: 'fst', value, values: fstyles })); break
      }
    }
  }
}

export default font
