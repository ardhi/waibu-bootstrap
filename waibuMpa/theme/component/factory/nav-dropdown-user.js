async function navDropdownUser () {
  return class NavDropdownUser extends this.baseFactory {
    build = async () => {
      const { has } = this.plugin.app.bajo.lib._
      const { routePath } = this.plugin.app.waibu
      const { req } = this.component
      const icon = this.component.req.iconset ? await this.component.buildTag({ tag: 'icon', attr: { name: 'person' } }) : ''
      let text = ''
      if (has(this.params.attr, 'title')) {
        if (req.user) {
          if (this.params.attr.title === 'short') text = `${req.user.firstName} ${req.user.lastName[0]}.`
          else if (['firstName', 'lastName', 'username'].includes(this.params.attr.title)) text = req.user[this.params.attr.title]
          else text = `${req.user.firstName} ${req.user.lastName}`
        } else text = req.t('guest')
      }
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
        if (req.user) {
          if (this.params.attr.fancyProfile) {
            const replacer = 'sumba.asset:/user-profile.png'
            const profile = await this.component.buildSentence(`
              <div>
                <c:dropdown-item href="sumba:/my-stuff/profile">
                  <c:img src="dobo:/attachment/SumbaUser/${req.user.id}/profile/main.png?notfound=${replacer}" responsive rounded />
                  <c:div margin="top-1" text="align:center">${req.user.firstName} ${req.user.lastName}</c:div>
                </c:dropdown-item>
              </div>
            `)
            html.push(profile)
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/change-password') }, html: this.component.req.t('changePassword') }))
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signout') }, html: this.component.req.t('signout') }))
          } else {
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/profile') }, html: this.component.req.t('yourProfile') }))
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/my-stuff/change-password') }, html: this.component.req.t('changePassword') }))
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { divider: true } }))
            html.push(await this.component.buildTag({ tag: 'dropdownItem', attr: { href: routePath('sumba:/signout') }, html: this.component.req.t('signout') }))
          }
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
