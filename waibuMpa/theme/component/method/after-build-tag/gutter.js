import { breakpoints, widths, parseVariant } from './_lib.js'

const xwidths = ['0', ...widths]
const prefixes = ['x', 'y', '']

function gutter ({ key, params }) {
  const { isString } = this.plugin.lib._
  const { attrToArray } = this.plugin.app.waibuMpa
  if (isString(params.attr.gutter)) {
    const items = attrToArray(params.attr.gutter)
    for (const item of items) {
      let [w, b] = item.split(':')
      if (!b) {
        b = w
        w = ''
      }
      if (!prefixes.includes(w)) break
      params.attr.class.push(parseVariant.call(this, { cls: `g${w}`, value: b, values: xwidths, variants: breakpoints, prepend: true }))
    }
  }
}

export default gutter
