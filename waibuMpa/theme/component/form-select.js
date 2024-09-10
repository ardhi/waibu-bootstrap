import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect (params = {}) {
  const { groupAttrs } = this.plugin.app.waibuMpa

  this._normalizeAttr(params, { autoId: true })
  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = await handleInput.call(this, { handler: buildFormSelect, params, attr })
  if (params.attr.wrapper === 'none') params.noTag = true
  else {
    params.attr = attr.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
}

export default formSelect
