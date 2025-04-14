import { buildFormSelect } from './_lib.js'
import { build } from './form-input.js'

export const inlineCss = `
.ts-dropdown {
  min-width: 242px;
}
.ts-wrapper {
  margin-left: calc(var(--bs-border-width) * -1) !important;
  border-top-left-radius: var(--bs-border-radius) !important;
  border-bottom-left-radius: var(--bs-border-radius) !important;
  white-space: nowrap !important;
}
.ts-control, .ts-control input, .ts-dropdown {
  color: inherit;
}
`
export const css = 'waibuExtra.virtual:/tom-select/css/tom-select.bootstrap5.min.css'
export const scripts = 'waibuExtra.virtual:/tom-select/js/tom-select.complete.min.js'

async function formSelectExt () {
  return class FormSelectExt extends this.baseFactory {
    static css = [...super.css, css]
    static scripts = [...super.scripts, scripts]
    static inlineCss = inlineCss

    build = async () => {
      const { omit } = this.plugin.lib._
      const { jsonStringify, base64JsonDecode } = this.plugin.app.waibuMpa
      this.params.attr['x-ref'] = 'select'
      this.params.attr['x-data'] = `{
        instance: null
      }`
      const plugins = ['drag_drop']
      if (!this.params.attr.noDropdownInput) plugins.push('dropdown_input')
      if (this.params.attr.removeBtn) plugins.push('remove_button')
      if (this.params.attr.clearBtn) plugins.push('clear_button')
      if (this.params.attr.optgroupColumns) plugins.push('optgroup_columns')
      const defOpts = { plugins }
      this.params.attr.options = this.params.attr.options ? base64JsonDecode(this.params.attr.options) : defOpts
      this.params.attr['@load.window'] = `
        const options = ${jsonStringify(this.params.attr.options, true)}
        instance = new TomSelect($refs.select, options)
      `
      await build.call(this, buildFormSelect, this.params)
      this.params.attr = omit(this.params.attr, ['noDropdownInput', 'removeBtn', 'clearBtn'])
    }
  }
}

export default formSelectExt
