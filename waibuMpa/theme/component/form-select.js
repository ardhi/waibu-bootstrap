import { buildFormHint, buildFormLabel, buildFormSelect } from './_lib.js'

async function formSelect ({ params, reply } = {}) {
  const { has } = this._
  const { groupAttrs } = this.mpa

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  const isLabel = has(params.attr, 'label')
  const isLabelFloating = has(attr.label, 'floating') && isLabel
  if (isLabelFloating) {
    attr.wrapper.class.push('form-floating')
    attr._.placeholder = attr._.label
  }

  if (!isLabelFloating && isLabel) contents.push(await buildFormLabel.call(this, attr))
  contents.push(await buildFormSelect.call(this, attr, params.html))
  if (isLabelFloating) contents.push(await buildFormLabel.call(this, attr))
  if (has(params.attr, 'hint')) contents.push(await buildFormHint.call(this, attr))
  params.attr = attr.wrapper
  params.tag = 'div'
  params.html = contents.join('\n')
}

export default formSelect
