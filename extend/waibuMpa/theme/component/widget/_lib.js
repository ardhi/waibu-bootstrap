import { sizes } from '../method/after-build-tag/_lib.js'

const trueValues = ['true', 'on', 'yes', '1', 1, true]

function getInputAttr (group, formControl = true, ro) {
  const { omit, get, set, isPlainObject, isArray, isString, has, forOwn } = this.app.lib._
  const { escape } = this.app.waibu
  if (formControl) group._.class.push('form-control')
  const attr = omit(group._, ['hint', 'label', 'wrapper'])
  if (attr.href) {
    forOwn(this.component.locals.form, (v, k) => {
      attr.href = attr.href.replace(`%7B${k}%7D`, v)
    })
  }
  if (has(attr, 'name') && !has(attr, 'value') && this.component.locals.form) {
    attr.dataType = attr.dataType ?? 'auto'
    let val = get(this, `component.locals.form.${attr.name}`)
    if (attr.dataType === 'boolean') {
      val = trueValues.includes(val)
      set(this, `component.locals.form.${attr.name}`, val)
    }
    if (isPlainObject(val) || isArray(val)) attr.dataValue = escape(JSON.stringify(val))
    else if (isString(val)) attr.dataValue = escape(val)
    else attr.dataValue = val
    if (ro) {
      if (attr.ref) {
        const [ref, fieldName = 'id'] = attr.ref.split(':')
        attr.value = get(this, `component.locals.form._ref.${ref}.${fieldName}`, val)
      } else if (attr.dataType === 'boolean') attr.value = this.component.req.t(val ? 'true' : 'false')
      else if (has(attr, 'name') === 'lat') attr.value = escape(this.component.req.format(val, attr.dataType, { latitude: true }))
      else if (has(attr, 'name') === 'lng') attr.value = escape(this.component.req.format(val, attr.dataType, { longitude: true }))
      else attr.value = escape(this.component.req.format(val, attr.dataType))
    } else attr.value = attr.dataValue
    if (isArray(val)) attr.value = val.join(' ')
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
  const attr = getInputAttr.call(this, group)
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheck (group, params) {
  const { has, get } = this.app.lib._
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  if (has(attr, 'name') && !has(attr, 'value')) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.value === get(this, `component.locals.form.${attr.name}`)) attr.checked = true
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormSwitch (group, params) {
  const { has } = this.app.lib._
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.class.push('form-check-input')
  attr.role = 'switch'
  if (has(attr, 'name')) attr.value = 'true'
  if (has(attr, 'name') && !has(attr, 'checked') && attr.dataValue) attr.checked = 'true'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadio (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.class.push('form-check-input')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormCheckToggle (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'checkbox'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormRadioToggle (group, params) {
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'radio'
  attr.autocomplete = 'off'
  attr.class.push('btn-check')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormPlaintext (group, params) {
  const attr = getInputAttr.call(this, group, false, true)
  delete attr.dataValue
  attr.class.push('form-control-plaintext')
  attr.readonly = ''
  if (['object', 'array', 'text'].includes(attr.dataType)) {
    attr.style.minHeight = '100px'
    return await this.component.buildTag({ tag: 'textarea', attr, html: attr.value })
  }
  if (attr.href) {
    const content = attr.value ? this.component.req.t(attr.value) : attr.href
    const html = await this.component.buildTag({ tag: 'a', attr: { href: attr.href, content } })
    return await this.component.buildTag({ tag: 'div', attr, html })
  }
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormColor (group, params) {
  const attr = getInputAttr.call(this, group)
  attr.class.push('form-control-color')
  attr.type = 'color'
  if (!attr.dim) attr.dim = 'width:100'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormFile (group, params) {
  const attr = getInputAttr.call(this, group)
  attr.type = 'file'
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}

export async function buildFormTextarea (group, params) {
  const attr = getInputAttr.call(this, group)
  params.html = attr.value
  attr.style.minHeight = '100px'
  delete attr.value
  return await this.component.buildTag({ tag: 'textarea', attr, html: params.html })
}

export async function buildFormSelect (group, params) {
  const { omit, trim } = this.app.lib._
  const { $ } = this.component
  let attr = getInputAttr.call(this, group, false)
  attr.value = attr.value + ''
  attr.class.push('form-select')
  let html = params.html
  if (sizes.includes(attr.size)) attr.class.push(`form-select-${attr.size}`)
  if (attr.options) html = this.component.buildOptions({ attr, html: '' })
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
  const attr = getInputAttr.call(this, group, false)
  attr.type = 'range'
  attr.class.push('form-range')
  return await this.component.buildTag({ tag: 'input', attr, selfClosing: true })
}
