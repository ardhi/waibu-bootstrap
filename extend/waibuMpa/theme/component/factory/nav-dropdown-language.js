async function navDropdownLanguage () {
  return class NavDropdownLanguage extends this.baseFactory {
    build = async () => {
      const { camelCase, cloneDeep, omit } = this.app.lib._
      const { supported } = this.app.bajo.config.intl
      const lang = this.component.req.lang
      const attr = cloneDeep(this.params.attr)
      this.params.attr = omit(this.params.attr, ['text'])
      attr.dropdown = true
      attr.content = lang.toUpperCase()
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
