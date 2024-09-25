async function navSelectorDarkmode (params = {}) {
  const { camelCase } = this.plugin.app.bajo.lib._
  const { supportedLngs } = this.plugin.app.bajoI18N.config
  const lang = params.req.lang
  const attr = {
    dropdown: true,
    dropdownMenu: params.attr.dropdownMenu,
    content: lang.toUpperCase()
  }
  const html = []
  for (const s of supportedLngs) {
    html.push(await this.buildTag({
      tag: 'dropdownItem',
      attr: { href: `?lang=${s}`, active: lang === s },
      html: params.req.t(camelCase(`lang ${s}`))
    }))
  }
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr, html: html.join('\n'), req: params.req, reply: params.reply })
}

export default navSelectorDarkmode
