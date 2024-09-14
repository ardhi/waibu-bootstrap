import { breakpoints, displays } from './_lib.js'

function display ({ key, params }) {
  const { uniq, isEmpty } = this.plugin.app.bajo.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  let canHaveGap
  for (const attr of attrs) {
    const [item, val] = attr.split(':')
    for (const value of uniq((val ?? '').split(','))) {
      switch (item) {
        case 'type': {
          const [core, bp] = value.split('-')
          let v = []
          if (breakpoints.includes(bp)) v.push(bp)
          if (displays.includes(core)) v.push(core)
          else v = []
          if (!isEmpty(v)) {
            if (attrs.includes('print')) v.unshift('print')
            v.unshift('d')
            params.attr.class.push(v.join('-'))
          }
          if (['grid'].includes(core)) canHaveGap = true
          break
        }
        case 'gap': {
          if (canHaveGap) params.attr.class.push(`gap-${value}`)
          break
        }
      }
    }
  }
}

export default display
