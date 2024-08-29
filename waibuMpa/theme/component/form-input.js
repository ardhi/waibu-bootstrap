import { buildFormHint, buildFormLabel, buildFormInput } from './_lib.js'

export async function build (item, { params, reply } = {}) {
  const { generateId } = this.plugin.app.bajo
  const { has } = this._
  const { groupAttrs } = this.mpa
  const contents = []

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  attr._.type = attr._.type ?? 'text'
  const isLabel = has(params.attr, 'label')
  const isLabelFloating = has(attr.label, 'floating') && isLabel
  let datalist

  if (isLabelFloating) {
    attr.wrapper.class.push('form-floating')
    attr._.placeholder = attr._.label
  }
  if (has(attr._, 'datalist') && !['password', 'file', 'checkbox', 'radio'].includes(attr._.type)) {
    datalist = attr._.datalist
    attr._.list = generateId()
    delete attr._.datalist
  }

  if (!isLabelFloating && isLabel) contents.push(await buildFormLabel.call(this, attr))
  contents.push(await item.call(this, attr))
  if (isLabelFloating) contents.push(await buildFormLabel.call(this, attr))
  if (has(params.attr, 'hint')) contents.push(await buildFormHint.call(this, attr))
  if (datalist) {
    const args = { attr: { id: attr._.list, options: datalist }, html: '' }
    const cmp = await this.buildTag({ tag: 'datalist', params: args, reply })
    contents.push(cmp)
  }
  params.attr = attr.wrapper
  params.tag = 'div'
  params.html = contents.join('\n')
}

async function formInput ({ params, reply } = {}) {
  await build.call(this, buildFormInput, { params, reply })
}

export default formInput
