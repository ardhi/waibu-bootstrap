import { sizes } from './_after-build-tag/_lib.js'

function getInputAttr (attr, formControl = true) {
  const { omit } = this.plugin.app.bajo.lib._
  if (formControl) attr._.class.push('form-control')
  const _attr = omit(attr._, ['hint', 'label', 'wrapper'])
  if (sizes.includes(_attr.size) && formControl) _attr.class.push(`form-control-${_attr.size}`)
  return omit(_attr, ['size'])
}

export async function buildFormHint (attr, tag, cls) {
  if (!attr.hint.id && attr._.id) attr.hint.id = attr._.id + '-hint'
  attr.hint.class.push(cls ?? 'form-text')
  return await this._render({ tag: tag ?? 'div', attr: attr.hint, html: attr._.hint })
}

export async function buildFormLabel (attr, tag, cls) {
  const { omit } = this.plugin.app.bajo.lib._
  attr.label.for = attr._.id
  if (!attr.label.floating) attr.label.class.push(cls ?? 'form-label')
  attr.label = omit(attr.label, ['floating'])
  return await this._render({ tag: tag ?? 'label', attr: attr.label, html: attr._.label })
}

export async function buildFormInput (attr, html, tag) {
  return await this._render({ tag: tag ?? 'input', attr: getInputAttr.call(this, attr), selfClosing: true })
}

export async function buildFormCheck (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.class.push('form-check-input')
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormSwitch (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.class.push('form-check-input')
  _attr.role = 'switch'
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormRadio (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'radio'
  _attr.class.push('form-check-input')
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormCheckToggle (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'checkbox'
  _attr.autocomplete = 'off'
  _attr.class.push('btn-check')
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormRadioToggle (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'radio'
  _attr.autocomplete = 'off'
  _attr.class.push('btn-check')
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormPlaintext (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.class.push('form-control-plaintext')
  _attr.readonly = ''
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormColor (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr)
  _attr.class.push('form-control-color')
  _attr.type = 'color'
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormFile (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr)
  _attr.type = 'file'
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}

export async function buildFormTextarea (attr, html, tag) {
  return await this._render({ tag: tag ?? 'textarea', attr: getInputAttr.call(this, attr), html })
}

export async function buildFormSelect (attr, html, tag) {
  const { omit, trim } = this.plugin.app.bajo.lib._
  attr._.class.push('form-select')
  const _attr = omit(attr._, ['hint', 'label', 'wrapper'])
  if (sizes.includes(_attr.size)) _attr.class.push(`form-select-${_attr.size}`)
  if (attr._.options) html = this._buildOptions({ attr: _attr, html: '' })
  else {
    const me = this
    const items = []
    this.$(`<div>${trim(html ?? '')}</div>`).find('option').each(function () {
      items.push(trim(me.$(this).prop('outerHTML')))
    })
    html = items.join('\n')
  }
  attr._ = omit(attr._, ['size', 'type'])
  return await this._render({ tag: tag ?? 'select', attr: _attr, html })
}

export async function buildFormRange (attr, html, tag) {
  const _attr = getInputAttr.call(this, attr, false)
  _attr.type = 'range'
  _attr.class.push('form-range')
  return await this._render({ tag: tag ?? 'input', attr: _attr, selfClosing: true })
}
