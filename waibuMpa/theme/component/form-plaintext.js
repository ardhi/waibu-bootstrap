import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext (params = {}) {
  params.attr.disabled = true
  if (params.attr.labelFloating) params.attr.class.push('border', 'rounded')
  await build.call(this, buildFormPlaintext, params)
}

export default formPlaintext
