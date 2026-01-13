import { buildFormRadio } from './_lib.js'
import { build } from './form-check.js'

async function formRadio () {
  return class FormRadio extends this.app.baseClass.MpaWidget {
    build = async () => {
      await build.call(this, buildFormRadio, this.params)
    }
  }
}

export default formRadio
