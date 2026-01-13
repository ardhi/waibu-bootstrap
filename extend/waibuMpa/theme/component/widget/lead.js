const cls = 'lead'

async function lead () {
  return class Lead extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      const { isString } = this.app.lib._
      const tag = isString(this.params.attr.tag) ? this.params.attr.tag : 'p'
      this.component.normalizeAttr(this.params, { tag, cls })
    }
  }
}

export default lead
