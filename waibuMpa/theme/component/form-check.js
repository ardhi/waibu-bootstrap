import { buildFormHint, buildFormLabel, buildFormCheck } from './_lib.js'

export async function build (item, { params, reply } = {}) {
  const { has, omit, isEmpty } = this._
  const { groupAttrs } = this.mpa

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  if (!isEmpty(attr._.label)) {
    attr.wrapper.class.push('form-check')
    if (has(attr.wrapper, 'inline')) attr.wrapper.class.push('form-check-inline')
    else if (has(attr.wrapper, 'reverse')) attr.wrapper.class.push('form-check-reverse')
  }

  contents.push(await item.call(this, attr))
  if (has(params.attr, 'label')) contents.push(await buildFormLabel.call(this, attr, undefined, 'form-check-label'))
  if (has(params.attr, 'hint')) contents.push(await buildFormHint.call(this, attr))
  attr.wrapper = omit(attr.wrapper, ['inline', 'reverse'])
  params.attr = attr.wrapper
  params.tag = 'div'
  params.html = contents.join('\n')
}

async function formCheck ({ params, reply } = {}) {
  await build.call(this, buildFormCheck, { params, reply })
}

export default formCheck
