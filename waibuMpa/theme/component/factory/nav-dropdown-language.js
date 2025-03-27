async function navDropdownLanguage () {
  return class NavDropdownLanguage extends this.baseFactory {
    build = async () => {
      const { camelCase } = this.plugin.lib._
      const { supported } = this.plugin.app.bajo.config.intl
      const lang = this.component.req.lang
      const attr = {
        dropdown: true,
        dropdownDir: this.params.attr.dropdownDir,
        dropdownMenudir: this.params.attr.dropdownMenudir,
        content: lang.toUpperCase()
      }
      if (this.params.attr.text) attr.text = this.params.attr.text
      const html = []
      for (const s of supported) {
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
