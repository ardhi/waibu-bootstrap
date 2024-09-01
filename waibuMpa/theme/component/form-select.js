import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect ({ params, reply } = {}) {
  const { groupAttrs } = this.mpa

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  const contents = await handleInput.call(this, { handler: buildFormSelect, params, attr })
  params.attr = attr.wrapper
  params.tag = 'div'
  params.html = contents.join('\n')
}

export default formSelect
