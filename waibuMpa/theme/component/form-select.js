import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect (params = {}) {
  const { groupAttrs } = this.plugin.app.waibuMpa

  this._normalizeAttr(params, { autoId: true })
  if (!params.attr.label && params.attr.name) params.attr.label = params.req.t(`field.${params.attr.name}`)
  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'], false)
  const contents = await handleInput.call(this, { handler: buildFormSelect, params, attr })
  if (params.attr.noWrapper) params.noTag = true
  else {
    params.attr = attr.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
}

export default formSelect
