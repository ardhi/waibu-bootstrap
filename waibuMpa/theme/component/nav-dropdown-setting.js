async function navDropdownSetting (params = {}) {
  const { set, camelCase } = this.plugin.app.bajo.lib._
  const { supportedLngs } = this.plugin.app.bajoI18N.config
  const { groupAttrs } = this.plugin.app.waibuMpa
  const { generateId } = this.plugin.app.bajo
  const { routePath } = this.plugin.app.waibu
  const cfgWmpa = this.plugin.app.waibuMpa.config

  const group = groupAttrs(params.attr, ['icon'])
  group.icon.name = 'gear'
  const icon = this.req.iconset ? await this.buildTag({ tag: 'icon', attr: group.icon }) : ''
  params.attr.dropdown = true
  params.attr.content = icon
  let html = `
    <c:dropdown-item header t:content="Display Mode" />
    <c:dropdown-item href="${this._buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') })}" ${this.req.darkMode ? '' : 'active'} t:content="Bright" />
    <c:dropdown-item href="${this._buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') })}" ${!this.req.darkMode ? '' : 'active'} t:content="Dark" />
    <c:dropdown-item header t:content="Language" />
  `
  for (const s of supportedLngs) {
    html += `<c:dropdown-item href="${this._buildUrl({ params: { lang: s } })}" ${this.req.lang === s ? 'active' : ''} t:content="${camelCase('lang ' + s)}" />`
  }
  html += `
    <c:dropdown-item divider />
    <c:dropdown-item t:content="Fullscreen"
      x-data="{
        inText: '${this.req.t('Fullscreen')}',
        outText: '${this.req.t('Exit Fullscreen')}',
        async toggle () {
          const el = document.querySelector('body')
          if (!document.fullscreenElement) {
            try {
              await el.requestFullscreen()
            } catch (err) {
              await wbs.notify('Can\\'t go fullscreen, sorry!', { type: 'danger' })
            }
          } else {
            document.exitFullscreen()
          }
        }
      }"
      @fullscreenchange.document="
        const el = $refs.fullscreen
        if (document.fullscreenElement) {
          el.innerHTML = outText
        } else {
          el.innerHTML = inText
        }
      "
      x-ref="fullscreen"
      @click="toggle()"
    />
  `
  if (this.req.user) {
    const id = generateId('alpha')
    html += `
      <c:dropdown-item t:content="Signout"
        id="${id}"
        x-data="{
          async signout () {
            await wbs.confirmation('${this.req.t('signoutWarning')}', { ok: '${id}:post', close: 'y' })
          },
          post () {
            wmpa.postForm({}, '${routePath('sumba:/signout')}')
          }
        }"
        @click="signout"
      />
    `
  }
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr: params.attr, html: await this.buildSentence(html) })
}

export default navDropdownSetting
