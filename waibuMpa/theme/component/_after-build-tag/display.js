import { breakpoints, displays } from './_lib.js'

function dislay ({ key, params }) {
  const { uniq, isEmpty } = this.plugin.app.bajo.lib._
  const attrs = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
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
          break
        }
      }
    }
  }
}

export default dislay
