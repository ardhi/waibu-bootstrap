const cls = 'figure-caption'

async function figcaption () {
  return class Figcaption extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
    }
  }
}

export default figcaption
