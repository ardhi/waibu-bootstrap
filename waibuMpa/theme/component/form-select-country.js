import { inlineCss, css, scripts } from './form-select-ext.js'

const formSelectCountry = {
  css,
  inlineCss,
  scripts,
  handler: async function (params = {}) {
    const { readConfig } = this.plugin.app.bajo
    const { map } = this.plugin.app.bajo.lib._
    const countries = await readConfig('bajoCommonDb:/dobo/fixture/country.json', { ignoreError: true, defValue: [] })
    params.attr.options = map(countries, c => {
      return { value: c.id, text: c.name }
    })
    params.html = await this.buildTag({ tag: 'formSelectExt', attr: params.attr, html: '' })
    params.noTag = true
  }
}

export default formSelectCountry
