import { buildFormRadio } from './_lib.js'
import { build } from './form-check.js'

async function formRadio (params = {}) {
  await build.call(this, buildFormRadio, params)
}

export default formRadio
