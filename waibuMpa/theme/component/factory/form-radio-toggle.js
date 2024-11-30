import { buildFormRadioToggle } from './_lib.js'
import { build } from './form-check-toggle.js'

async function formRadioToggle (component) {
  return class FormRadioToggle extends component.baseFactory {
    async build () {
      if (!this.params.attr.label) this.params.attr.label = this.component.req.t('Toggle Radio')
      await build.call(this, buildFormRadioToggle, this.params)
    }
  }
}

export default formRadioToggle
