import { buildFormRadio } from './_lib.js'
import { build } from './form-check.js'

async function formRadio (component) {
  return class FormRadio extends component.baseFactory {
    async build () {
      await build.call(this, buildFormRadio, this.params)
    }
  }
}

export default formRadio
