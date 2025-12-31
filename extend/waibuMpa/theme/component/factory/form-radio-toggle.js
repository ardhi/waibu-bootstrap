import { buildFormRadioToggle } from './_lib.js'
import { build } from './form-check-toggle.js'

async function formRadioToggle () {
  return class FormRadioToggle extends this.baseFactory {
    build = async () => {
      if (!this.params.attr.label) this.params.attr.label = this.component.req.t('Toggle Radio')
      await build.call(this, buildFormRadioToggle, this.params)
    }
  }
}

export default formRadioToggle
