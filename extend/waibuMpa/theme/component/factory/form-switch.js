import { buildFormSwitch } from './_lib.js'
import { build } from './form-check.js'

async function formSwitch () {
  return class FormSwitch extends this.baseFactory {
    constructor (options) {
      super(options)
      this.params.attr.wrapperClass = this.params.attr.wrapperClass ?? ''
      this.params.attr.wrapperClass += ' form-switch'
    }

    build = async () => {
      await build.call(this, buildFormSwitch, this.params)
    }
  }
}

export default formSwitch
