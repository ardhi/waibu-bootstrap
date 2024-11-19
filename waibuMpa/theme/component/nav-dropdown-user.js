async function navDropdownUser (params = {}) {
  /*
  if (!this.locals._meta.plugins.includes('sumba')) {
    params.noTag = true
    params.html = ''
    return
  }
  */
  const { routePath } = this.plugin.app.waibu
  const icon = this.req.iconset ? await this.buildTag({ tag: 'icon', attr: { name: 'person' } }) : ''
  const text = this.req.user ? `${this.req.user.firstName} ${this.req.user.lastName}` : this.req.t('Guest')
  const html = []
  const attr = {
    dropdown: true,
    dropdownMenu: params.attr.dropdownMenu,
    content: `${icon} ${text}`
  }
  if (params.attr.noMenu) {
    delete attr.dropdown
    delete attr.dropdownMenu
    attr.href = routePath(this.req.user ? 'sumba:/my-stuff/profile' : 'sumba:/signin')
  } else {
    if (this.req.user) {
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/profile') }, html: this.req.t('Your Profile') }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/change-password') }, html: this.req.t('Change Password') }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signout') }, html: this.req.t('Signout') }))
    } else {
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signin') }, html: this.req.t('Signin') }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/signup') }, html: this.req.t('Signup') }))
      html.push(await this.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/user/forgot-password') }, html: this.req.t('Forgot Password') }))
    }
  }
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr, html: html.join('\n') })
}

export default navDropdownUser
