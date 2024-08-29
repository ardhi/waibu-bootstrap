import { buildFormFile } from './_lib.js'
import { build } from './form-input.js'

async function formFile ({ params, reply } = {}) {
  params.attr.type = 'file'
  await build.call(this, buildFormFile, { params, reply })
}

export default formFile
