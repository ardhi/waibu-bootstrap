import { buildFormSelect } from './_lib.js'
import { build } from './form-input.js'

export const inlineCss = `
.ts-wrapper {
  margin-left: calc(var(--bs-border-width) * -1) !important;
  border-top-left-radius: var(--bs-border-radius) !important;
  border-bottom-left-radius: var(--bs-border-radius) !important;
}
.ts-control, .ts-control input, .ts-dropdown {
  color: inherit;
}
`
export const css = 'waibuExtra.virtual:/tom-select/css/tom-select.bootstrap5.min.css'
export const scripts = 'waibuExtra.virtual:/tom-select/js/tom-select.complete.min.js'

const formSelectExt = {
  css,
  inlineCss,
  scripts,
  handler: async function (params = {}) {
    const { omit } = this.plugin.app.bajo.lib._
    const { jsonStringify } = this.plugin.app.waibuMpa
    params.attr['x-ref'] = 'select'
    params.attr['x-data'] = `{
      instance: null
    }`
    const plugins = ['drag_drop']
    if (!params.attr.noDropdownInput) plugins.push('dropdown_input')
    if (params.attr.removeBtn) plugins.push('remove_button')
    if (params.attr.clearBtn) plugins.push('clear_button')
    if (params.attr.optgroupColumns) plugins.push('optgroup_columns')
    params.attr['@load.window'] = `
      const options = {
        plugins: ${jsonStringify(plugins, true)}
      }
      instance = new TomSelect($refs.select, options)
    `
    await build.call(this, buildFormSelect, params)
    params.attr = omit(params.attr, ['noDropdownInput', 'removeBtn', 'clearBtn'])
  }
}

export default formSelectExt
