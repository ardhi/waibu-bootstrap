async function formInputAddon (params = {}) {
  params.tag = 'div'
  params.attr.addon = params.attr.prepend ? 'prepend' : 'append'
}

export default formInputAddon
