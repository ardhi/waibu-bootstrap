import { breakpoints, parseSimple } from './_after-build-tag/_lib.js'
const cls = 'container'

const container = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { has, omit } = this._
    params.tag = 'div'
    if (has(params.attr, 'responsive')) params.attr.class.push(`${cls}-fluid`)
    else if (has(params.attr, 'breakpoint')) params.attr.class.push(parseSimple({ cls, value: params.attr.breakpoint, values: breakpoints }))
    else params.attr.class.push(cls)
    params.attr = omit(params.attr, ['responsive', 'breakpoint'])
  }
}

export default container
