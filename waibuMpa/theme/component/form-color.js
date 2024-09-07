import { buildFormColor } from './_lib.js'
import { build } from './form-input.js'

async function formColor (params = {}) {
  await build.call(this, buildFormColor, params)
}

export default formColor
