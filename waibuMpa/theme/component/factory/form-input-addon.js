async function formInputAddon (component) {
  return class FormInputAddon extends component.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { tag: 'div', addon: this.params.attr.prepend ? 'prepend' : 'append' })
    }
  }
}

export default formInputAddon
