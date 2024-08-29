const sizes = ['sm', 'lg']

function getInputAttr (attr, formControl = true) {
  const { omit, has } = this._
  if (formControl) attr._.class.push('form-control')
  const _attr = omit(attr._, ['hint', 'label', 'wrapper'])
  if (has(_attr, 'size')) {
    if (sizes.includes(_attr.size)) _attr.class.push(`form-control-${_attr.size}`)
  }
  return omit(_attr, ['size'])
}

export async function buildFormHint (attr, tag, cls) {
  const { has } = this._
  if (!has(attr.hint, 'id') && has(attr._, 'id')) attr.hint.id = attr._.id + '-hint'
  attr.hint.class.push(cls ?? 'form-text')
  return await this._render(tag ?? 'div', { params: { attr: attr.hint, html: attr._.hint } })
}

export async function buildFormLabel (attr, tag, cls) {
  const { omit, has } = this._
  attr.label.for = attr._.id
  if (!has(attr.label, 'floating')) attr.label.class.push(cls ?? 'form-label')
  attr.label = omit(attr.label, ['floating'])
  return await this._render(tag ?? 'label', { params: { attr: attr.label, html: attr._.label } })
}

export async function buildFormInput (attr, tag) {
  return await this._render(tag ?? 'input', { params: { attr: getInputAttr.call(this, attr), selfClosing: true } })
}

export async function buildFormCheck (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.class.push('form-check-input')
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormSwitch (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.class.push('form-check-input')
  _attr.role = 'switch'
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormRadio (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'radio'
  _attr.class.push('form-check-input')
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormCheckToggle (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.autocomplete = 'off'
  _attr.class.push('btn-check')
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormRadioToggle (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'radio'
  _attr.autocomplete = 'off'
  _attr.class.push('btn-check')
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormPlaintext (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.class.push('form-control-plaintext')
  _attr.readonly = ''
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormColor (attr, tag) {
  const _attr = getInputAttr.call(this, attr)
  _attr.class.push('form-control-color')
  _attr.type = 'color'
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormFile (attr, tag) {
  const _attr = getInputAttr.call(this, attr)
  _attr.type = 'file'
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}

export async function buildFormTextarea (attr, html, tag) {
  return await this._render(tag ?? 'textarea', { params: { attr: getInputAttr.call(this, attr), html } })
}

export async function buildFormSelect (attr, html, tag) {
  const { omit, has } = this._
  attr._.class.push('form-select')
  const _attr = omit(attr._, ['hint', 'label', 'wrapper'])
  if (has(_attr, 'size')) {
    if (sizes.includes(_attr.size)) _attr.class.push(`form-select-${_attr.size}`)
  }
  if (has(attr._, 'options')) html = this._buildOptions({ params: { attr: _attr, html: '' } })
  attr._ = omit(attr._, ['size', 'type'])
  return await this._render(tag ?? 'select', { params: { attr: _attr, html } })
}

export async function buildFormRange (attr, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'range'
  _attr.class.push('form-range')
  return await this._render(tag ?? 'input', { params: { attr: _attr, selfClosing: true } })
}
