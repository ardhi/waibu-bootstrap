import { buildFormRange } from './_lib.js'
import { build } from './form-input.js'

async function formDatetime (params = {}) {
  params.attr.type = 'range'
  delete params.attr.labelFloating
  await build.call(this, buildFormRange, params)
}

export default formDatetime
