import { buildFormInput } from './_lib.js'
import { build } from './form-input.js'

async function formPassword () {
  return class FormPassword extends this.baseFactory {
    build = async () => {
      this.params.attr.type = 'password'
      await build.call(this, buildFormInput, this.params)
    }
  }
}

export default formPassword
