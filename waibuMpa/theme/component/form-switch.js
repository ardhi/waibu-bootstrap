import { buildFormSwitch } from './_lib.js'
import { build } from './form-check.js'

async function formSwitch (params = {}) {
  params.attr['wrapper-class'] = params.attr['wrapper-class'] ?? ''
  params.attr['wrapper-class'] += ' form-switch'
  await build.call(this, buildFormSwitch, params)
}

export default formSwitch
