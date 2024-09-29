async function formSelectCountry (params = {}) {
  const { readConfig } = this.plugin.app.bajo
  const { map } = this.plugin.app.bajo.lib._
  const countries = await readConfig('bajoCommonDb:/dobo/fixture/country.json', { ignoreError: true, defValue: [] })
  params.attr.options = map(countries, c => {
    return { value: c.id, text: c.name }
  })
  params.html = await this.buildTag({ tag: 'formSelect', attr: params.attr, html: '' })
  params.noTag = true
}

export default formSelectCountry
