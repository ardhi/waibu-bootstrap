import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext (component) {
  return class FormPlaintext extends component.baseFactory {
    async build () {
      this.params.attr.disabled = true
      if (this.params.attr.labelFloating) this.params.attr.class.push('border', 'rounded')
      await build.call(this, buildFormPlaintext, this.params)
    }
  }
}

export default formPlaintext
