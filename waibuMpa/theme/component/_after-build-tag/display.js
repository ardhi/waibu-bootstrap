import { breakpoints, displays } from './_lib.js'

function dislay ({ key, params }) {
  const { uniq, isEmpty } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'type': {
          const [core, bp] = val.split('-')
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
