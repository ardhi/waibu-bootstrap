async function navSelectorDarkmode (params = {}) {
  const { titleize } = this.plugin.app.bajo
  const name = params.req.darkMode ? 'dark' : 'bright'
  const content = params.req.iconset ? await this.buildTag({ tag: 'icon', attr: { name } }) : params.req.t(titleize(name))
  const attr = {
    dropdown: true,
    dropdownMenu: params.attr.dropdownMenu,
    content
  }
  const html = [
    await this.buildTag({ tag: 'dropdownItem', attr: { href: '?dark-mode=false', active: !params.req.darkMode }, html: params.req.t('Bright Mode') }),
    await this.buildTag({ tag: 'dropdownItem', attr: { href: '?dark-mode=true', active: params.req.darkMode }, html: params.req.t('Dark Mode') })
  ].join('\n')
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr, html, req: params.req, reply: params.reply })
}

export default navSelectorDarkmode
