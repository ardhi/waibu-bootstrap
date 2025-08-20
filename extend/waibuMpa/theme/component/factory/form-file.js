import { buildFormFile } from './_lib.js'
import { build } from './form-input.js'

async function formFile () {
  return class FormFile extends this.baseFactory {
    constructor (options) {
      super(options)
      this.params.attr.type = 'file'
    }

    build = async () => {
      await build.call(this, buildFormFile, this.params)
    }
  }
}

export default formFile
