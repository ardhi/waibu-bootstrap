async function navDropdownSetting () {
  return class NavDropdownSetting extends this.baseFactory {
    async build () {
      const { set, camelCase } = this.plugin.app.bajo.lib._
      const { supported } = this.plugin.app.bajo.config.intl
      const { groupAttrs } = this.plugin.app.waibuMpa
      const { generateId } = this.plugin.app.bajo
      const { routePath } = this.plugin.app.waibu
      const cfgWmpa = this.plugin.app.waibuMpa.config

      const group = groupAttrs(this.params.attr, ['icon'])
      group.icon.name = 'gear'
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: group.icon }) : ''
      this.params.attr.dropdown = true
      this.params.attr.content = icon
      let html = `
        <c:dropdown-item header t:content="Display Mode" />
        <c:dropdown-item href="${this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') })}" ${this.component.req.darkMode ? '' : 'active'} t:content="Bright" />
        <c:dropdown-item href="${this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') })}" ${!this.component.req.darkMode ? '' : 'active'} t:content="Dark" />
      `
      if (supported.length > 0) {
        html += `
          <c:dropdown-item divider />
          <c:dropdown-item header t:content="Language" />
        `
        for (const s of supported) {
          html += `<c:dropdown-item href="${this.component.buildUrl({ params: { lang: s } })}" ${this.component.req.lang === s ? 'active' : ''} t:content="${camelCase('lang ' + s)}" />`
        }
      }
      html += `
        <c:dropdown-item divider />
        <c:dropdown-item t:content="fullscreen"
          x-data="{
            inText: '${this.component.req.t('fullscreen')}',
            outText: '${this.component.req.t('exitFullscreen')}',
            async toggle () {
              const el = document.querySelector('body')
              if (!document.fullscreenElement) {
                try {
                  await el.requestFullscreen()
                } catch (err) {
                  await wbs.notify('cantGoFullscreen', { type: 'danger' })
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
      if (this.component.req.user) {
        const id = generateId('alpha')
        html += `
          <c:dropdown-item t:content="signout"
            id="${id}"
            x-data="{
              async signout () {
                await wbs.confirmation('${this.component.req.t('signoutWarning')}', { ok: '${id}:post', close: 'y' })
              },
              post () {
                wmpa.postForm({}, '${routePath('sumba:/signout')}')
              }
            }"
            @click="signout"
          />
        `
      }
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr: this.params.attr, html: await this.component.buildSentence(html) })
    }
  }
}

export default navDropdownSetting
