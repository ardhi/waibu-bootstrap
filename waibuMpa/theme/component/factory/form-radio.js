import { buildFormRadio } from './_lib.js'
import { build } from './form-check.js'

async function formRadio () {
  return class FormRadio extends this.baseFactory {
    async build () {
      await build.call(this, buildFormRadio, this.params)
    }
  }
}

export default formRadio
