const cls = 'figure-caption'

async function figcaption (component) {
  return class Figcaption extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
    }
  }
}

export default figcaption
