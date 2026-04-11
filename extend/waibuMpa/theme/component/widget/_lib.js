import { sizes } from '../method/after-build-tag/_lib.js'

async function getInputAttr (group, formControl = true, ro) {
  const { omit, get, isPlainObject, isArray, has, forOwn, find } = this.app.lib._
  const { escape } = this.app.waibu
  if (formControl) group._.class.push('form-control')
  const attr = omit(group._, ['hint', 'label', 'wrapper'])
  if (attr.href) {
    forOwn(this.component.locals.form, (v, k) => {
      attr.href = attr.href.replace(`%7B${k}%7D`, v)
    })
  }
  if (has(attr, 'name') && !has(attr, 'value') && this.component.locals.form) {
    let prop = {}
    const schema = get(this, 'component.locals.schema')
    if (schema) prop = find(schema.properties, { name: attr.name }) ?? {}
    attr.dataType = attr.dataType ?? prop.type
    attr.dataValue = get(this, `component.locals.form._orig.${attr.name}`)
    if (isPlainObject(attr.dataValue) || isArray(attr.dataValue)) attr.dataValue = JSON.stringify(attr.dataValue)
    attr.dataValue = escape(attr.dataValue)
    attr.value = escape(get(this, `component.locals.form.${attr.name}`))
  }
  if (sizes.includes(attr.size) && formControl) attr.class.push(`form-control-${attr.size}`)
  return omit(attr, ['size', 'col'])
}

export async function buildFormHint (group, tag, cls) {
  if (!group.hint.id && group._.id) group.hint.id = group._.id + '-hint'
  group.hint.class.push(cls ?? 'form-text')
  return await this.component.buildTag({ tag: tag ?? 'div', attr: group.hint, html: group._.hint })
}

export async function buildFormLabel (group, tag, cls) {
  const { omit } = this.app.lib._
  group.label.for = group._.id
  if (!group.label.floating) group.label.class.push(cls ?? 'form-label')
  group.label = omit(group.label, ['floating'])
  return await this.component.buildTag({ tag: tag ?? 'label', attr: group.label, html: group._.label })
}

export async function buildFormInput (group, params) {
  const attr = await getInputAttr.call(this, group)
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheck (group, params) {
  const { has, get } = this.app.lib._
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  if (has(attr, 'name') && !has(attr, 'value')) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.value === get(this, `component.locals.form.${attr.name}`)) attr.checked = true
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormSwitch (group, params) {
  const { has } = this.app.lib._
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  attr.role = 'switch'
  if (has(attr, 'name')) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.dataValue) attr.checked = 'true'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadio (group, params) {
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.class.push('form-check-input')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheckToggle (group, params) {
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadioToggle (group, params) {
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormPlaintext (group, params) {
  const attr = await getInputAttr.call(this, group, false, true)
  // delete attr.dataValue
  attr.class.push('form-control-plaintext')
  attr.readonly = ''
  if (['object', 'array', 'text'].includes(attr.dataType)) {
    attr.style.minHeight = '100px'
    return await this.component.buildTag({ tag: 'textarea', attr, html: attr.value })
  }
  if (attr.href) {
    const content = attr.value ? attr.value : attr.href
    const html = await this.component.buildTag({ tag: 'a', attr: { href: attr.href, content } })
    return await this.component.buildTag({ tag: 'div', attr, html })
  }
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormColor (group, params) {
  const attr = await getInputAttr.call(this, group)
  attr.class.push('form-control-color')
  attr.type = 'color'
  if (!attr.dim) attr.dim = 'width:100'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormFile (group, params) {
  const attr = await getInputAttr.call(this, group)
  attr.type = 'file'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormTextarea (group, params) {
  const attr = await getInputAttr.call(this, group)
  params.html = attr.value
  attr.style.minHeight = '100px'
  delete attr.value
  return await this.component.buildTag({ tag: 'textarea', attr, html: params.html })
}

export async function buildFormSelect (group, params) {
  const { omit, trim } = this.app.lib._
  const { isSet } = this.app.lib.aneka
  const { $ } = this.component
  let attr = await getInputAttr.call(this, group, false)
  attr.value = isSet(attr.value) ? (attr.value + '') : undefined
  attr.class.push('form-select')
  let html = params.html
  if (sizes.includes(attr.size)) attr.class.push(`form-select-${attr.size}`)
  if (attr.options) html = await this.component.buildOptions({ attr })
  else {
    const items = []
    $(`<div>${trim(html ?? '')}</div>`).find('option').each(function () {
      items.push(trim($(this).prop('outerHTML')))
    })
    html = items.join('\n')
  }
  attr = omit(attr, ['size', 'type', 'options', 'value'])
  return await this.component.buildTag({ tag: attr.tag ?? 'select', attr, html })
}

export async function buildFormRange (group, params) {
  const attr = await getInputAttr.call(this, group, false)
  attr.type = 'range'
  attr.class.push('form-range')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}
