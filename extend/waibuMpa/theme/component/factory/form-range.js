import { buildFormRange } from './_lib.js'
import { build } from './form-input.js'

async function formRange () {
  return class FormRange extends this.baseFactory {
    build = async () => {
      this.params.attr.type = 'range'
      delete this.params.attr.labelFloating
      await build.call(this, buildFormRange, this.params)
    }
  }
}

export default formRange
