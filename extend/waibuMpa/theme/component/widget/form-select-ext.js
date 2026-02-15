import { buildFormSelect } from './_lib.js'
import { build } from './form-input.js'

export const css = [
  'waibuExtra.virtual:/tom-select/css/tom-select.bootstrap5.min.css',
  'waibuBootstrap.asset:/css/widget.css'
]
export const scripts = 'waibuExtra.virtual:/tom-select/js/tom-select.complete.min.js'

async function formSelectExt () {
  return class FormSelectExt extends this.app.baseClass.MpaWidget {
    static css = [...super.css, css]
    static scripts = [...super.scripts, scripts]

    build = async () => {
      const { generateId } = this.app.lib.aneka
      const { omit, merge, has } = this.app.lib._
      const { routePath } = this.app.waibu
      const { jsonStringify, base64JsonDecode, groupAttrs } = this.app.waibuMpa
      const { req } = this.component
      let apiKey = ''
      if (req.user && this.app.sumba) apiKey = await this.app.sumba.getApiKeyFromUserId(req.user.id)
      const xref = this.params.attr['x-ref'] ?? 'select'
      this.params.attr.id = this.params.attr.id ?? generateId('alpha')
      this.params.attr['x-ref'] = xref
      const xData = ['instance: null', 'value: null']
      const plugins = ['drag_drop']
      if (!this.params.attr.noDropdownInput) plugins.push('dropdown_input')
      if (this.params.attr.removeBtn) plugins.push('remove_button')
      if (this.params.attr.clearBtn) plugins.push('clear_button')
      if (this.params.attr.optgroupColumns) plugins.push('optgroup_columns')
      if (this.params.attr.noCaret) this.params.attr.class.push('no-caret') // TODO: no caret remove caret on ALL instances, need to make it instance specific
      let options = []
      if (this.params.attr.options) {
        try {
          options = base64JsonDecode(this.params.attr.options)
        } catch (err) {
          options = this.params.attr.options.split(' ').map(item => {
            return { value: item, text: item }
          })
        }
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
      const fetchOpts = { headers: {} }
      if (group.remote) {
        group.remote.url = routePath(group.remote.url)
        group.remote.searchField = group.remote.searchField ?? 'id'
        group.remote.labelField = group.remote.labelField ?? 'id'
        group.remote.valueField = group.remote.valueField ?? 'id'
        if (has(group.remote, 'apiKey')) {
          if (group.remote.apiKey === true) fetchOpts.headers.Authorization = `Bearer ${apiKey}` // TODO: get it from wmpa
          else fetchOpts.headers.Authorization = `Bearer ${group.remote.apiKey}`
        }
        opts = opts.slice(0, -1) + `,
          searchField: '${group.remote.searchField}',
          labelField: '${group.remote.labelField}',
          valueField: '${group.remote.valueField}',
          load: (query, callback) => {
            fetch('${group.remote.url}?query=${group.remote.searchField}:~\\'' + query + '\\'', ${jsonStringify(fetchOpts, true)})
              .then(resp => resp.json())
              .then(json => {
                callback(json.data)
              })
              .catch(() => {
                callback()
              })
          },
          render: {
            option: (data, escape) => {
              return '<div>' + escape(data.${group.remote.labelField}) + '</div>'
            },
            item: (data, escape) => {
              $dispatch('formselectext', { id: '${this.params.attr.id}', data })
              return '<div>' + escape(data.${group.remote.labelField}) + '</div>'
            }
          }
        }`
      }
      let text = `onLoad () {
        const opts = ${opts}
        this.instance = new TomSelect($refs.${xref}, opts)
        const val = $refs.${xref}.dataset.value
        if (!_.isEmpty(val)) {
          this.value = val.split('|')
        }
      `
      if (this.params.attr.valueStore) {
        const [store, key] = this.params.attr.valueStore.split(':')
        text += `
          this.value = Alpine.store('${store}').${key}
          this.instance.on('change', value => {
            this.value = _.cloneDeep(value)
            Alpine.store('${store}').${key} = this.value
          })
        `
      }
      if (group.remote) {
        text += `
          if (!_.isEmpty(this.value)) {
            if (!_.isArray(this.value)) this.value = [this.value]
            let query = '${group.remote.valueField}:['
            let q = ''
            for (const v of this.value) {
              q += ',' + v
            }
            query += q.slice(1) + ']'
            fetch('${group.remote.url}?query=' + query, ${jsonStringify(fetchOpts, true)})
              .then(resp => resp.json())
              .then(json => {
                if (json.data.length === 0) return
                for (const d of json.data) {
                  const opt = _.pick(d, ['${group.remote.valueField}', '${group.remote.labelField}'])
                  this.instance.addOption(opt)
                }
                this.instance.setValue(json.data.map(item => item.${group.remote.valueField}))
              })
          }
        `
      }
      text += '}'
      xData.push(text)
      this.params.attr['x-data'] = `{ ${xData.join(',\n')} }`
      // this.params.attr['@load.window'] = 'onLoad()'
      this.params.attr['x-init'] = 'onLoad()'
      this.params.attr.options = options
      this.params.attr = omit(this.params.attr, ['noDropdownInput', 'removeBtn', 'clearBtn', 'c-opts', 'remoteUrl', 'remoteSearchField', 'remoteLabelField', 'remoteValueField'])
      await build.call(this, buildFormSelect, this.params)
    }
  }
}

export default formSelectExt
