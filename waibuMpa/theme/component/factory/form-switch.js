import { buildFormSwitch } from './_lib.js'
import { build } from './form-check.js'

async function formSwitch (component) {
  return class FormSwitch extends component.baseFactory {
    constructor (options) {
      super(options)
      this.params.attr.wrapperClass = this.params.attr.wrapperClass ?? ''
      this.params.attr.wrapperClass += ' form-switch'
    }

    async build () {
      await build.call(this, buildFormSwitch, this.params)
    }
  }
}

export default formSwitch
