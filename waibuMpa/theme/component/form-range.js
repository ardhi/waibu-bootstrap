import { buildFormRange } from './_lib.js'
import { build } from './form-input.js'

async function formFile ({ params, reply } = {}) {
  params.attr.type = 'range'
  delete params.attr['label-floating']
  await build.call(this, buildFormRange, { params, reply })
}

export default formFile
