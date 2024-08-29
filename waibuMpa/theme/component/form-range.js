import { buildFormRange } from './_lib.js'
import { build } from './form-input.js'

async function formFile ({ params, reply } = {}) {
  params.attr.type = 'range'
  await build.call(this, buildFormRange, { params, reply })
}

export default formFile
