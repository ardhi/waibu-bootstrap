async function navItemSignout (component) {
  return class NavItemSignout extends component.baseFactory {
    async build () {
      if (!this.component.req.user) return
      const { generateId } = this.plugin.app.bajo
      const { routePath } = this.plugin.app.waibu
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
