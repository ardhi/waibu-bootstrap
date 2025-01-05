import { breakpoints, opacities, heights, parseVariant, parseSimple, colors } from './_lib.js'

const decorations = ['underline', 'line-through', 'none']
const transforms = ['lowercase', 'uppercase', 'capitalize', 'monospace']
const alignments = ['start', 'center', 'break', 'reset', 'end']
const directs = ['wrap', 'nowrap', 'mark', 'small', 'truncate']
const variants = ['emphasis', 'secondary', 'tertiary']

function text ({ key, params }) {
  const { uniq } = this.plugin.app.bajo.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  const textColors = ['body', 'black', 'white', ...colors]
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (!val && directs.includes(item)) params.attr.class.push(['mark', 'small'].includes(item) ? item : `text-${item}`)
    else {
      for (const value of uniq((val ?? '').split(','))) {
        switch (item) {
          case 'decoration': params.attr.class.push(parseSimple.call(this, { cls: 'text-decoration', value, values: decorations })); break
          case 'line-height': params.attr.class.push(parseSimple.call(this, { cls: 'lh', value, values: heights })); break
          case 'transform': params.attr.class.push(parseSimple.call(this, { cls: 'text', value, values: transforms })); break
          case 'align': params.attr.class.push(parseVariant.call(this, { cls: 'text', value: val, values: alignments, variants: breakpoints, prepend: true })); break
          case 'opacity': params.attr.class.push(parseSimple.call(this, { cls: 'text-opacity', value, values: opacities })); break
          case 'background': params.attr.class.push(parseSimple.call(this, { cls: 'text-bg', value, values: textColors })); break
          case 'color': params.attr.class.push(parseVariant.call(this, { cls: 'text', value: val, values: textColors, variants })); break
        }
      }
    }
  }
}

export default text
