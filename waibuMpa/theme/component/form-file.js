import { buildFormFile } from './_lib.js'
import { build } from './form-input.js'

async function formFile (params = {}) {
  params.attr.type = 'file'
  await build.call(this, buildFormFile, params)
}

export default formFile
