async function navSelectorDarkmode (params = {}) {
  const { titleize } = this.plugin.app.bajo
  const { set } = this.plugin.app.bajo.lib._
  const cfgWmpa = this.plugin.app.waibuMpa.config
  const name = this.req.darkMode ? 'dark' : 'bright'
  const content = this.req.iconset ? await this.buildTag({ tag: 'icon', attr: { name } }) : this.req.t(titleize(name))
  const attr = {
    dropdown: true,
    dropdownMenu: params.attr.dropdownMenu,
    content
  }
  const html = [
    await this.buildTag({ tag: 'dropdownItem', attr: { href: this._buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') }), active: !this.req.darkMode }, html: this.req.t('Bright Mode') }),
    await this.buildTag({ tag: 'dropdownItem', attr: { href: this._buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') }), active: this.req.darkMode }, html: this.req.t('Dark Mode') })
  ].join('\n')
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr, html })
}

export default navSelectorDarkmode
