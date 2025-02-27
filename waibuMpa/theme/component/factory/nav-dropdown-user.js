async function navDropdownUser () {
  return class NavDropdownUser extends this.baseFactory {
    async build () {
      const { routePath } = this.plugin.app.waibu
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name: 'person' } }) : ''
      let text = this.component.req.user ? `${this.component.req.user.firstName} ${this.component.req.user.lastName}` : this.component.req.t('guest')
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
