async function navSelectorDarkmode (params = {}) {
  const { camelCase } = this.plugin.app.bajo.lib._
  const { supportedLngs } = this.plugin.app.bajoI18N.config
  const lang = this.req.lang
  const attr = {
    dropdown: true,
    dropdownMenu: params.attr.dropdownMenu,
    content: lang.toUpperCase()
  }
  const html = []
  for (const s of supportedLngs) {
    html.push(await this.buildTag({
      tag: 'dropdownItem',
      attr: { href: this._buildUrl({ lang: s }), active: lang === s },
      html: this.req.t(camelCase(`lang ${s}`))
    }))
  }
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr, html: html.join('\n') })
}

export default navSelectorDarkmode
