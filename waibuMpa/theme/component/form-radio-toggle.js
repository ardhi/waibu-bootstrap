import { buildFormRadioToggle } from './_lib.js'
import { build } from './form-check-toggle.js'

async function formRadioToggle (params = {}) {
  const { has } = this._
  if (!has(params.attr, 'label')) params.attr.label = params.req.t('Toggle Radio')
  await build.call(this, buildFormRadioToggle, params)
}

export default formRadioToggle
