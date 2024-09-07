import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext (params = {}) {
  await build.call(this, buildFormPlaintext, params)
}

export default formPlaintext
