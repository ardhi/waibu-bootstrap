import { buildFormColor } from './_lib.js'
import { build } from './form-input.js'

async function formColor ({ params, reply } = {}) {
  await build.call(this, buildFormColor, { params, reply })
}

export default formColor
