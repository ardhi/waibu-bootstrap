import { breakpoints, justifyContents, alignItems, widths } from './_lib.js'
const dirs = ['row', 'row-reverse', 'column', 'column-reverse']
const orders = ['0', 'first', 'last', ...widths]
const grows = ['0', '1']
const type = {
  dir: dirs,
  'justify-content': justifyContents,
  'align-content': justifyContents,
  'align-item': alignItems,
  'align-self': alignItems,
  grow: grows,
  shrink: grows,
  order: orders
}

function border ({ key, params }) {
  const { uniq, isEmpty } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  const inline = attrs.includes('inline')
  let hasFlex = false
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    if (item === 'breakpoint') hasFlex = true
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'fill':
        case 'wrap':
        case 'nowrap': {
          if (!val) params.attr.class.push(`flex-${item}`)
          else if (breakpoints.includes(val)) params.attr.class.push(`flex-${val}-${item}`)
          break
        }
        case 'breakpoint': if (breakpoints.includes(value)) params.attr.class.push(`d-${value}-${inline ? 'inline-' : ''}flex`); break
        case 'grow':
        case 'shrink':
        case 'dir':
        case 'order':
        case 'align-item':
        case 'align-self':
        case 'align-content':
        case 'justify-content': {
          const [core, bp] = val.split('-')
          let v = []
          if (breakpoints.includes(bp)) v.push(bp)
          if (type[item].includes(core)) v.push(core)
          else v = []
          if (!isEmpty(v)) {
            let prefix = item
            if (['dir', 'grow', 'shrink'].includes(item)) prefix = 'flex'
            v.unshift(prefix)
            if (['grow', 'shrink'].includes(item)) v.splice(v.length - 1, 0, item)
            params.attr.class.push(v.join('-'))
          }
          break
        }
      }
    }
  }
  if (!hasFlex) params.attr.class.unshift(inline ? 'd-inline-flex' : 'd-flex')
}

export default border
