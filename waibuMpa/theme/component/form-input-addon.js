async function formInputAddon ({ params, reply } = {}) {
  const { has } = this._
  params.tag = 'div'
  params.attr.addon = has(params.attr, 'prepend') ? 'prepend' : 'append'
}

export default formInputAddon
