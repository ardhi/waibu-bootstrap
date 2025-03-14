import { breakpoints, justifyContents, alignItems, widths } from './_lib.js'
const dirs = ['row', 'row-reverse', 'column', 'column-reverse']
const orders = ['0', 'first', 'last', ...widths]
const grows = ['0', '1']
const type = {
  dir: dirs,
  'justify-content': justifyContents,
  'align-content': justifyContents,
  'align-items': alignItems,
  'align-self': alignItems,
  grow: grows,
  shrink: grows,
  order: orders
}

function flex ({ key, params }) {
  const { uniq, isEmpty } = this.plugin.lib._
  if (params.attr[key] === true) {
    params.attr.class.push('d-flex')
    return
  }
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  const inline = attrs.includes('inline')
  let hasFlex = false
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    if (item === 'breakpoint') hasFlex = true
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'gap': params.attr.class.push(`gap-${value}`); break
        case 'column':
        case 'row':
        case 'fill':
        case 'wrap':
        case 'nowrap': {
          if (!value) params.attr.class.push(`flex-${item}`)
          else if (breakpoints.includes(val)) params.attr.class.push(`flex-${value}-${item}`)
          break
        }
        case 'breakpoint': if (breakpoints.includes(val)) params.attr.class.push(`d-${val}-${inline ? 'inline-' : ''}flex`); break
        case 'grow':
        case 'shrink':
        case 'dir':
        case 'order':
        case 'align-items':
        case 'align-self':
        case 'align-content':
        case 'justify-content': {
          const [core, bp] = value.split('-')
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

export default flex
