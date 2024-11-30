import { inlineCss, css, scripts } from './form-select-ext.js'

async function formSelectCountry (component) {
  return class FormSelectCountry extends component.baseFactory {
    constructor (options) {
      super(options)
      this.css = css
      this.inlineCss = inlineCss
      this.scripts = scripts
      this.params.noTag = true
    }

    async build () {
      const { readConfig } = this.plugin.app.bajo
      const { map } = this.plugin.app.bajo.lib._
      const countries = await readConfig('bajoCommonDb:/dobo/fixture/country.json', { ignoreError: true, defValue: [] })
      this.params.attr.options = map(countries, c => {
        return { value: c.id, text: c.name }
      })
      this.params.html = await this.component.buildTag({ tag: 'formSelectExt', attr: this.params.attr, html: '' })
    }
  }
}

export default formSelectCountry
