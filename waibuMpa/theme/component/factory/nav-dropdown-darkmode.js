async function navDropdownDarkmode () {
  return class NavDropdownDarkmode extends this.baseFactory {
    build = async () => {
      const { titleize, isSet } = this.plugin.app.bajo
      const { set, omit } = this.plugin.lib._
      const cfgWmpa = this.plugin.app.waibuMpa.config
      this.params.noTag = true
      if (isSet(this.plugin.app.waibuMpa.config.darkMode.set)) {
        this.params.html = ''
        return
      }
      const name = this.component.req.darkMode ? 'dark' : 'bright'
      const content = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name } }) : this.component.req.t(titleize(name))
      const attr = omit(this.params.attr, ['text'])
      attr.dropdown = true
      attr.content = content
      if (this.params.attr.text) attr.text = this.params.attr.text
      const html = [
        await this.component.buildTag({ tag: 'dropdownItem', attr: { href: this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') }), active: !this.component.req.darkMode }, html: this.component.req.t('brightMode') }),
        await this.component.buildTag({ tag: 'dropdownItem', attr: { href: this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') }), active: this.component.req.darkMode }, html: this.component.req.t('darkMode') })
      ].join('\n')
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr, html })
    }
  }
}

export default navDropdownDarkmode
