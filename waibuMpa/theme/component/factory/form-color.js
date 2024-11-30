import { buildFormColor } from './_lib.js'
import { build } from './form-input.js'

async function formColor (component) {
  return class FormColor extends component.baseFactory {
    async build () {
      await build.call(this, buildFormColor, this.params)
    }
  }
}

export default formColor
