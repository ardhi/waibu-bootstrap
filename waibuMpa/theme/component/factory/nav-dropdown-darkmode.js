async function navDropdownDarkmode () {
  return class NavDropdownDarkmode extends this.baseFactory {
    async build () {
      const { titleize } = this.plugin.app.bajo
      const { set } = this.plugin.app.bajo.lib._
      const cfgWmpa = this.plugin.app.waibuMpa.config
      const name = this.component.req.darkMode ? 'dark' : 'bright'
      const content = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name } }) : this.component.req.t(titleize(name))
      const attr = {
        dropdown: true,
        dropdownMenu: this.params.attr.dropdownMenu,
        content
      }
      const html = [
        await this.component.buildTag({ tag: 'dropdownItem', attr: { href: this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') }), active: !this.component.req.darkMode }, html: this.component.req.t('Bright Mode') }),
        await this.component.buildTag({ tag: 'dropdownItem', attr: { href: this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') }), active: this.component.req.darkMode }, html: this.component.req.t('Dark Mode') })
      ].join('\n')
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr, html })
    }
  }
}

export default navDropdownDarkmode
