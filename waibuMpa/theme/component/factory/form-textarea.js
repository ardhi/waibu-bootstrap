import { buildFormTextarea } from './_lib.js'
import { build } from './form-input.js'

async function formTextarea () {
  return class FormTextarea extends this.baseFactory {
    async build () {
      await build.call(this, buildFormTextarea, this.params)
    }
  }
}

export default formTextarea
