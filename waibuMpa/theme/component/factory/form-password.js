import { buildFormInput } from './_lib.js'
import { build } from './form-input.js'

async function formPassword (component) {
  return class FormPassword extends component.baseFactory {
    async build () {
      this.params.attr.type = 'password'
      await build.call(this, buildFormInput, this.params)
    }
  }
}

export default formPassword
