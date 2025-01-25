import { inlineCss, css, scripts } from './form-select-ext.js'

async function formSelectCountry () {
  return class FormSelectCountry extends this.baseFactory {
    static css = [...super.css, css]

    static scripts = [...super.scripts, scripts]

    static inlineCss = inlineCss

    constructor (options) {
      super(options)
      this.params.noTag = true
    }

    async build () {
      const { readConfig } = this.plugin.app.bajo
      const { map } = this.plugin.app.bajo.lib._
      const { base64JsonEncode } = this.plugin.app.waibuMpa
      const countries = await readConfig('bajoCommonDb:/dobo/fixture/country.json', { ignoreError: true, defValue: [] })
      this.params.attr.options = base64JsonEncode(map(countries, c => {
        return { value: c.id, text: c.name.replaceAll('\'', '') }
      }))
      this.params.html = await this.component.buildTag({ tag: 'formSelectExt', attr: this.params.attr, html: '' })
    }
  }
}

export default formSelectCountry
