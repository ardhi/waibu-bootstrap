import { breakpoints, parseSimple } from '../method/after-build-tag/_lib.js'
const cls = 'container'

async function container () {
  return class Container extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div' })
    }

    build = async () => {
      const { has, omit } = this.app.lib._
      if (has(this.params.attr, 'responsive')) this.params.attr.class.push(`${cls}-fluid`)
      else if (has(this.params.attr, 'breakpoint')) this.params.attr.class.push(parseSimple({ cls, value: this.params.attr.breakpoint, values: breakpoints }))
      else this.params.attr.class.push(cls)
      this.params.attr = omit(this.params.attr, ['responsive', 'breakpoint'])
    }
  }
}

export default container
