async function navDropdownUser () {
  return class NavDropdownUser extends this.baseFactory {
    async build () {
      const { has } = this.plugin.app.bajo.lib._
      const { routePath } = this.plugin.app.waibu
      const { req } = this.component
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name: 'person' } }) : ''
      let text = ''
      if (has(this.params.attr, 'showName')) {
        if (req.user) {
          if (this.params.attr.showName === 'username') text = req.user.username
          else if (this.params.attr.showName === 'full') text = `${req.user.firstName} ${req.user.lastName}`
          else if (this.params.attr.showName === 'short') text = `${req.user.firstName} ${req.user.lastName[0]}.`
          else text = req.user[this.params.attr.showName]
        } else text = req.t('guest')
      }
      if (this.params.attr.noText) text = ''
      const html = []
      const attr = {
        dropdown: true,
        dropdownDir: this.params.attr.dropdownDir,
        dropdownMenudir: this.params.attr.dropdownMenudir,
        content: `${icon} ${text}`
      }
      if (this.params.attr.noMenu) {
        delete attr.dropdown
        delete attr.dropdownMenu
        attr.href = routePath(this.component.req.user ? 'sumba:/my-stuff/profile' : 'sumba:/signin')
      } else {
        if (this.component.req.user) {
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/profile') }, html: this.component.req.t('yourProfile') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/change-password') }, html: this.component.req.t('changePassword') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signout') }, html: this.component.req.t('signout') }))
        } else {
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signin') }, html: this.component.req.t('signin') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/signup') }, html: this.component.req.t('signup') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/forgot-password') }, html: this.component.req.t('forgotPassword') }))
        }
      }
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr, html: html.join('\n') })
    }
  }
}

export default navDropdownUser
