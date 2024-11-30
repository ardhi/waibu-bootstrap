async function navDropdownUser (component) {
  return class NavDropdownUser extends component.baseFactory {
    async build () {
      const { routePath } = this.plugin.app.waibu
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name: 'person' } }) : ''
      const text = this.component.req.user ? `${this.component.req.user.firstName} ${this.component.req.user.lastName}` : this.component.req.t('Guest')
      const html = []
      const attr = {
        dropdown: true,
        dropdownMenu: this.params.attr.dropdownMenu,
        content: `${icon} ${text}`
      }
      if (this.params.attr.noMenu) {
        delete attr.dropdown
        delete attr.dropdownMenu
        attr.href = routePath(this.component.req.user ? 'sumba:/my-stuff/profile' : 'sumba:/signin')
      } else {
        if (this.component.req.user) {
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/profile') }, html: this.component.req.t('Your Profile') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/change-password') }, html: this.component.req.t('Change Password') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signout') }, html: this.component.req.t('Signout') }))
        } else {
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signin') }, html: this.component.req.t('Signin') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/signup') }, html: this.component.req.t('Signup') }))
          html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/forgot-password') }, html: this.component.req.t('Forgot Password') }))
        }
      }
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr, html: html.join('\n') })
    }
  }
}

export default navDropdownUser
