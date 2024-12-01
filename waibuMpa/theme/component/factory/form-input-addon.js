async function formInputAddon () {
  return class FormInputAddon extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'div', addon: this.params.attr.prepend ? 'prepend' : 'append' })
    }
  }
}

export default formInputAddon
