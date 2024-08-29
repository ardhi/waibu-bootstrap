import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext ({ params, reply } = {}) {
  await build.call(this, buildFormPlaintext, { params, reply })
}

export default formPlaintext
