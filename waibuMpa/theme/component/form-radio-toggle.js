import { buildFormRadioToggle } from './_lib.js'
import { build } from './form-check-toggle.js'

async function formRadioToggle ({ params, reply } = {}) {
  const { has } = this._
  if (!has(params.attr, 'label')) params.attr.label = reply.request.t('Toggle Radio')
  await build.call(this, buildFormRadioToggle, { params, reply })
}

export default formRadioToggle
