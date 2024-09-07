import { buildFormInput } from './_lib.js'
import { build } from './form-input.js'

async function formPassword (params = {}) {
  params.attr.type = 'password'
  await build.call(this, buildFormInput, params)
}

export default formPassword
