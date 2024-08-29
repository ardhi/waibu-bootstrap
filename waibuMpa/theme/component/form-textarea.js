import { buildFormTextarea } from './_lib.js'
import { build } from './form-input.js'

async function formTextarea ({ params, reply } = {}) {
  await build.call(this, buildFormTextarea, { params, reply })
}

export default formTextarea
