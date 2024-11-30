import { buildFormFile } from './_lib.js'
import { build } from './form-input.js'

async function formFile (component) {
  return class FormFile extends component.baseFactory {
    constructor (options) {
      super(options)
      this.params.attr.type = 'file'
    }

    async build () {
      await build.call(this, buildFormFile, this.params)
    }
  }
}

export default formFile
