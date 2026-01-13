async function navItemSignout () {
  return class NavItemSignout extends this.app.baseClass.MpaWidget {
    build = async () => {
      if (!this.component.req.user) return
      const { generateId } = this.app.lib.aneka
      const { routePath } = this.app.waibu
      this.params.attr.id = generateId('alpha')
      this.params.attr.href = '#'
      this.params.attr['x-data'] = `{
        async signout () {
          await wbs.confirmation(\`${this.component.req.t('signoutWarning')}\`, { ok: '${this.params.attr.id}:post', close: 'y' })
        },
        post () {
          wmpa.postForm({}, '${routePath('sumba:/signout')}')
        }
      }`
      this.params.attr['@click'] = 'signout'
      const icon = await this.component.buildTag({ tag: 'icon', attr: { name: this.params.attr.iconName ?? 'signout', style: 'font-size: 1.5rem' } })
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr: this.params.attr, html: icon })
      delete this.params.attr.iconName
    }
  }
}

export default navItemSignout
