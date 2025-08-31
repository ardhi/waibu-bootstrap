async function navDropdownSetting () {
  return class NavDropdownSetting extends this.baseFactory {
    build = async () => {
      const { set, camelCase } = this.app.lib._
      const { supported } = this.plugin.app.bajo.config.intl
      const { groupAttrs } = this.plugin.app.waibuMpa
      const { generateId } = this.plugin.app.bajo
      const { routePath } = this.plugin.app.waibu
      const { isSet } = this.app.lib.aneka
      const { req } = this.component
      const cfgWmpa = this.plugin.app.waibuMpa.config

      const group = groupAttrs(this.params.attr, ['icon'])
      if (!group.icon) group.icon = { style: {}, class: [] }
      group.icon.name = 'gear'
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: group.icon }) : ''
      this.params.attr.dropdown = true
      this.params.attr.content = icon
      let profile = `
        <c:dropdown-item href="sumba:/your-stuff/profile" t:content="yourProfile" />
        <c:dropdown-item href="sumba:/your-stuff/change-password" t:content="changePassword" />
      `
      if (this.params.attr.fancyProfile) {
        profile = await this.component.buildSentence(`
          <div>
            <c:dropdown-item href="sumba:/your-stuff/profile">
              <c:img src="dobo:/attachment/SumbaUser/${req.user.id}/profile/main.png" responsive rounded />
              <c:div margin="top-1">${req.user.firstName} ${req.user.lastName}</c:div>
            </c:dropdown-item>
          </div>
        `)
      }
      let darkMode = ''
      if (!isSet(cfgWmpa.darkMode.set)) {
        darkMode = `
          <c:dropdown-item divider />
          <c:dropdown-item href="${this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'false') })}" ${this.component.req.darkMode ? '' : 'active'} t:content="bright" />
          <c:dropdown-item href="${this.component.buildUrl({ params: set({}, cfgWmpa.darkMode.qsKey, 'true') })}" ${!this.component.req.darkMode ? '' : 'active'} t:content="dark" />
        `
      }
      let html = `
        ${profile}
        ${darkMode}
      `
      if (supported.length > 0) {
        html += `
          <c:dropdown-item divider />
        `
        for (const s of supported) {
          html += `<c:dropdown-item href="${this.component.buildUrl({ params: { lang: s } })}" ${this.component.req.lang === s ? 'active' : ''} t:content="${camelCase('lang ' + s)}" />`
        }
      }
      html += `
        <c:dropdown-item divider />
        <c:dropdown-item t:content="fullscreen"
          x-data="{
            inText: \`${this.component.req.t('fullscreen')}\`,
            outText: \`${this.component.req.t('exitFullscreen')}\`,
            async toggle () {
              const el = document.querySelector('body')
              if (!document.fullscreenElement) {
                try {
                  await el.requestFullscreen()
                } catch (err) {
                  await wbs.notify(\`${this.component.req.t('cantGoFullscreen')}\`, { type: 'danger' })
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
                await wbs.confirmation(\`${this.component.req.t('signoutWarning')}\`, { ok: '${id}:post', close: 'y' })
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
