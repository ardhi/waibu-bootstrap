import { sizes } from './_after-build-tag/_lib.js'

function getInputAttr (group, formControl = true, ro) {
  const { omit, get, isPlainObject, isArray, isString, has } = this.plugin.app.bajo.lib._
  const { escape } = this.plugin.app.waibu
  if (formControl) group._.class.push('form-control')
  const attr = omit(group._, ['hint', 'label', 'wrapper'])
  if (has(attr, 'name') && !attr.value && this.locals.form) {
    attr.dataType = attr.dataType ?? 'auto'
    const val = get(this, `locals.form.${attr.name}`)
    if (isPlainObject(val) || isArray(val)) attr.dataValue = escape(JSON.stringify(val))
    else if (isString(val)) attr.dataValue = escape(val)
    else attr.dataValue = val
    if (ro) {
      if (attr.dataType === 'boolean') attr.value = this.req.t(val ? 'Yes' : 'No')
      else if (has(attr, 'name') === 'lat') attr.value = escape(this.req.format(val, attr.dataType, { latitude: true }))
      else if (has(attr, 'name') === 'lng') attr.value = escape(this.req.format(val, attr.dataType, { longitude: true }))
      else attr.value = escape(this.req.format(val, attr.dataType))
    } else attr.value = attr.dataValue
  }
  if (sizes.includes(attr.size) && formControl) attr.class.push(`form-control-${attr.size}`)
  return omit(attr, ['size', 'col'])
}

export async function buildFormHint (group, tag, cls) {
  if (!group.hint.id && group._.id) group.hint.id = group._.id + '-hint'
  group.hint.class.push(cls ?? 'form-text')
  return await this._render({ tag: tag ?? 'div', attr: group.hint, html: group._.hint })
}

export async function buildFormLabel (group, tag, cls) {
  const { omit } = this.plugin.app.bajo.lib._
  group.label.for = group._.id
  if (!group.label.floating) group.label.class.push(cls ?? 'form-label')
  group.label = omit(group.label, ['floating'])
  return await this._render({ tag: tag ?? 'label', attr: group.label, html: group._.label })
}

export async function buildFormInput (group, params) {
  const attr = getInputAttr.call(this, group)
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheck (group, params) {
  const { has, get } = this.plugin.app.bajo.lib._
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  if (has(attr, 'name') && !attr.value) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.value === get(this, `locals.form.${attr.name}`)) attr.checked = true
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormSwitch (group, params) {
  const { has, get } = this.plugin.app.bajo.lib._
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  attr.role = 'switch'
  if (has(attr, 'name') && !attr.value) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.value === get(this, `locals.form.${attr.name}`)) attr.checked = true
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadio (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.class.push('form-check-input')
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheckToggle (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadioToggle (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormPlaintext (group, params) {
  const attr = getInputAttr.call(this, group, false, true)
  attr.class.push('form-control-plaintext')
  attr.readonly = ''
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormColor (group, params) {
  const attr = getInputAttr.call(this, group)
  attr.class.push('form-control-color')
  attr.type = 'color'
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormFile (group, params) {
  const attr = getInputAttr.call(this, group)
  attr.type = 'file'
  return await this._render({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormTextarea (group, params) {
  const attr = getInputAttr.call(this, group)
  params.html = attr.value
  delete attr.value
  return await this._render({ tag: 'textarea', attr, html: params.html })
}

export async function buildFormSelect (group, params) {
  const { omit, trim } = this.plugin.app.bajo.lib._
  let attr = getInputAttr.call(this, group, false)
  attr.value = attr.value + ''
  attr.class.push('form-select')
  let html = params.html
  if (sizes.includes(attr.size)) attr.class.push(`form-select-${attr.size}`)
  if (attr.options) html = this._buildOptions({ attr, html: '' })
  else {
    const me = this
    const items = []
    this.$(`<div>${trim(html ?? '')}</div>`).find('option').each(function () {
      items.push(trim(me.$(this).prop('outerHTML')))
    })
    html = items.join('\n')
  }
  attr = omit(attr, ['size', 'type', 'options', 'value'])
  return await this._render({ tag: 'select', attr, html })
}

export async function buildFormRange (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'range'
  attr.class.push('form-range')
  return await this._render({ tag: 'input', attr, selfClosing: true })
}
