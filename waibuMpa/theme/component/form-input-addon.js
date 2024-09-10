async function formInputAddon (params = {}) {
  this._normalizeAttr(params, { tag: 'div', addon: params.attr.prepend ? 'prepend' : 'append' })
}

export default formInputAddon
