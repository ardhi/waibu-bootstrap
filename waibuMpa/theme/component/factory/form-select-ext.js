import { buildFormSelect } from './_lib.js'
import { build } from './form-input.js'

// TODO: load default values from remote
export const inlineCss = `
.ts-dropdown {
  min-width: 242px;
}
.ts-control {
  padding-top: 0px;
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
.form-floating > .ts-wrapper {
  padding-top: 1.625rem !important;
}

.ts-wrapper.focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.focus .ts-control {
  box-shadow: none;
  border: none;
  box-shadow: none;
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
      const { generateId } = this.plugin.app.bajo
      const { omit, merge } = this.plugin.lib._
      const { routePath } = this.plugin.app.waibu
      const { jsonStringify, base64JsonDecode, groupAttrs } = this.plugin.app.waibuMpa
      const xref = this.params.attr['x-ref'] ?? 'select'
      this.params.attr.id = this.params.attr.id ?? generateId('alpha')
      this.params.attr['x-ref'] = xref
      this.params.attr['x-data'] = `{
        instance: null
      }`
      const plugins = ['drag_drop']
      if (!this.params.attr.noDropdownInput) plugins.push('dropdown_input')
      if (this.params.attr.removeBtn) plugins.push('remove_button')
      if (this.params.attr.clearBtn) plugins.push('clear_button')
      if (this.params.attr.optgroupColumns) plugins.push('optgroup_columns')
      let options = []
      if (this.params.attr.options) {
        try {
          options = base64JsonDecode(this.params.attr.options)
        } catch (err) {
          options = this.params.attr.options.split(' ').map(item => {
            return { value: item, text: item }
          })
        }
        this.params.attr.options = options
      }
      let opts = { plugins }
      let cOpts = {}
      if (this.params.attr.cOpts) {
        try {
          cOpts = base64JsonDecode(this.params.attr.cOpts)
        } catch (err) {}
      }
      if (!cOpts.optsText) opts = jsonStringify(merge(opts, cOpts), true)
      else opts = cOpts.optsText
      const group = groupAttrs(this.params.attr, ['remote'])
      if (group.remote) {
        group.remote.url = routePath(group.remote.url)
        group.remote.searchField = group.remote.searchField ?? 'name'
        group.remote.labelField = group.remote.labelField ?? 'name'
        group.remote.valueField = group.remote.valueField ?? 'id'
        opts = `{
          searchField: '${group.remote.searchField}',
          labelField: '${group.remote.labelField}',
          valueField: '${group.remote.valueField}',
          load: (query, callback) => {
            fetch('${group.remote.url}?query=${group.remote.searchField}:~^\\'' + query + '\\'')
              .then(resp => resp.json())
              .then(json => {
                callback(json.data)
              })
              .catch(() => {
                callback
              })
          },
          render: {
            option: (data, escape) => {
              return '<div>' + escape(data.name) + '</div>'
            },
            item: (data, escape) => {
              $dispatch('formselectext', { id: '${this.params.attr.id}', data })
              return '<div>' + escape(data.name) + '</div>'
            }
          }
        }`
      }

      this.params.attr['@load.window'] = `
        const opts = ${opts}
        instance = new TomSelect($refs.${xref}, opts)
      `
      this.params.attr = omit(this.params.attr, ['noDropdownInput', 'removeBtn', 'clearBtn', 'c-opts', 'remoteUrl'])
      await build.call(this, buildFormSelect, this.params)
    }
  }
}

export default formSelectExt
