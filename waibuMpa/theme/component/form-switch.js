import { buildFormSwitch } from './_lib.js'
import { build } from './form-check.js'

async function formSwitch (params = {}) {
  params.attr.wrapperClass = params.attr.wrapperClass ?? ''
  params.attr.wrapperClass += ' form-switch'
  await build.call(this, buildFormSwitch, params)
}

export default formSwitch
