import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect (params = {}) {
  const { groupAttrs } = this.plugin.app.waibuMpa
  const { isString } = this.plugin.app.bajo.lib._
  const { generateId } = this.plugin.app.bajo

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  attr._.id = isString(params.attr.id) ? params.attr.id : generateId()
  const contents = await handleInput.call(this, { handler: buildFormSelect, params, attr })
  if (params.attr.wrapper === 'none') params.noTag = true
  else {
    params.attr = attr.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
}

export default formSelect
