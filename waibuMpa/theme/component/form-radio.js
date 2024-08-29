import { buildFormRadio } from './_lib.js'
import { build } from './form-check.js'

async function formRadio ({ params, reply } = {}) {
  await build.call(this, buildFormRadio, { params, reply })
}

export default formRadio
