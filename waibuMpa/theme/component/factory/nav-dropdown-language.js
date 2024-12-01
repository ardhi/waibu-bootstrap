async function navDropdownLanguage () {
  return class NavDropdownLanguage extends this.baseFactory {
    async build () {
      const { camelCase } = this.plugin.app.bajo.lib._
      const { supportedLngs } = this.plugin.app.bajoI18N.config
      const lang = this.component.req.lang
      const attr = {
        dropdown: true,
        dropdownMenu: this.params.attr.dropdownMenu,
        content: lang.toUpperCase()
      }
      const html = []
      for (const s of supportedLngs) {
        html.push(await this.component.buildTag({
          tag: 'dropdownItem',
          attr: { href: this.component.buildUrl({ params: { lang: s } }), active: lang === s },
          html: this.component.req.t(camelCase(`lang ${s}`))
        }))
      }
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr, html: html.join('\n') })
    }
  }
}

export default navDropdownLanguage
