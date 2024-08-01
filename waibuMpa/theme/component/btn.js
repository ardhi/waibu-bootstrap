const baseCls = 'btn'

const getAttrValues = {
  variant: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link'],
  size: ['sm', 'md', 'lg']
}

async function btn ({ params, reply } = {}) {
  const { has, isEmpty, omit } = this._

  const attr = params.attr
  // tag
  params.tag = has(attr, 'href') || attr.tag === 'a' ? 'a' : 'button'
  if (params.tag === 'button' && attr.href) delete attr.href
  if (params.tag === 'a' && isEmpty(attr.href)) attr.href = '#'
  if (params.tag === 'a') attr.role = 'button'
  // def
  attr.class.push(baseCls)
  if (has(attr, 'toggle')) attr['data-bs-toggle'] = 'button'
  if (has(attr, 'active')) {
    attr.class.push('active')
    attr['aria-pressed'] = true
  }
  const cls = `${baseCls}${has(attr, 'outline') ? '-outline' : ''}`
  for (const item of ['variant', 'size']) {
    this._getAttr(attr, item, cls, getAttrValues)
  }
  if (has(attr, 'text-nowrap')) attr.class.push('text-nowrap')
  if (has(attr, 'icon')) {
    const args = { attr: { name: attr.icon }, html: '' }
    await this.icon({ params: args, reply })
    params.html = await this._renderTag('i', { params: args, reply }) + ' ' + params.html
    delete attr.icon
  }
  if (has(attr, 'icon-end')) {
    const args = { attr: { name: attr['icon-end'] }, html: '' }
    await this.icon({ params: args, reply })
    params.html += ' ' + await this._renderTag('i', { params: args, reply })
    delete attr['icon-end']
  }
  const omitted = ['icon', 'icon-end', 'text-nowrap', 'active', 'toggle']
  if (params.tag === 'a' && has(attr, 'disabled')) {
    attr.class.push('disabled')
    attr['aria-disabled'] = true
    omitted.push('disabled')
  }
  params.attr = omit(attr, omitted)
  return '.' + baseCls
}

export default btn
