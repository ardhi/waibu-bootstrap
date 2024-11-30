import { buildFormTextarea } from './_lib.js'
import { build } from './form-input.js'

async function formTextarea (component) {
  return class FormTextarea extends component.baseFactory {
    async build () {
      await build.call(this, buildFormTextarea, this.params)
    }
  }
}

export default formTextarea
