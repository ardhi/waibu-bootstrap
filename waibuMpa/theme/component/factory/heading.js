async function heading () {
  return class Heading extends this.baseFactory {
    constructor (options) {
      super(options)
      this.params.attr.type = this.params.attr.type ?? '1'
      let [type, display] = this.params.attr.type.split('-')
      if (display && display !== 'display') display = undefined
      const tag = display ? 'h1' : ('h' + type)
      this.component.normalizeAttr(this.params, { tag })
      if (this.params.attr.tag && !display) {
        this.params.attr.class.push('h' + type)
        this.params.tag = this.params.attr.tag
      }
      if (display) this.params.attr.class.push(`display-${type}`)
      delete this.params.attr.type
    }
  }
}

export default heading
