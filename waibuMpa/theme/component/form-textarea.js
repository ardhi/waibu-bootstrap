import { buildFormTextarea } from './_lib.js'
import { build } from './form-input.js'

async function formTextarea (params = {}) {
  await build.call(this, buildFormTextarea, params)
}

export default formTextarea
