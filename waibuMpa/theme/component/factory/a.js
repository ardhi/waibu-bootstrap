async function a () {
  return class A extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'a' })
      if (!this.params.attr.href) this.params.attr.href = '#'
      if (this.params.html.includes('<i class="')) this.params.attr.class.push('icon-link')
    }
  }
}

export default a
