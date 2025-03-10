import { buildFormColor } from './_lib.js'
import { build } from './form-input.js'

async function formColor () {
  return class FormColor extends this.baseFactory {
    build = async () => {
      await build.call(this, buildFormColor, this.params)
    }
  }
}

export default formColor
