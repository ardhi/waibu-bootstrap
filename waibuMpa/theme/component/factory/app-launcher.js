async function appLauncher () {
  return class AppLauncher extends this.baseFactory {
    constructor (options) {
      super(options)
      const { generateId } = this.plugin.app.bajo
      this.params.noTag = true
      this.params.attr.id = this.params.attr.id ?? generateId('alpha')
      this.params.attr.type = this.params.attr.type ?? 'drawer'
    }

    build = async () => {
      const { groupAttrs, attrToArray } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['trigger'])
      let launcher = `<c:drawer id="${this.params.attr.id}" t:title="Modules" no-padding>\n`
      launcher += '<c:div padding="start-3 bottom-3 end-3">'
      if (this.params.attr.type === 'modal') launcher = `<c:modal id="${this.params.attr.id}" t:title="Modules" centered>\n`
      const toolbar = attrToArray(this.params.attr.toolbar)
      if (toolbar.length > 0) {
        launcher += '<c:navbar>\n<c:nav tag="ul" dim="width:100" flex="justify-content:end">\n'
        for (const t of toolbar) {
          if (t === 'user') launcher += '<c:nav-dropdown-user />\n'
          if (t === '-') launcher += '<c:nav-divider />\n'
          if (t === 'fullscreen') launcher += '<c:nav-toggle-fullscreen />\n'
          if (t === 'darkmode') launcher += '<c:nav-dropdown-darkmode dropdown-menu="end" />\n'
          if (t === 'language') launcher += '<c:nav-dropdown-language dropdown-menu="end" />\n'
        }
        launcher += '</c:nav></c:navbar>\n'
      }
      launcher += '<c:grid-row gutter="1">\n'
      for (const m of (this.component.locals.menu.homes ?? [])) {
        launcher += `
          <c:grid-col col="4" text="align:center">
            <c:a href="${m.href}" display="type:block" border rounded padding="all-2" text="decoration:none">
              <c:img src="waibuMpa:/logo/${m.ns}" height="60" fluid/>
              <c:div margin="top-2">${m.title}</c:div>
            </c:a>
          </c:grid-col>
        `
      }
      launcher += '</c:grid-row>\n'
      if (this.params.attr.type === 'modal') launcher += '</c:modal>'
      else launcher += '</c:div></c:drawer>'
      let trigger = ''
      if (group.trigger) {
        this.params.attr = group._
        group.trigger.open = `${this.params.attr.id}:drawer`
        trigger = await this.component.buildTag({ tag: 'appLauncherTrigger', attr: group.trigger })
      }
      launcher = `${trigger} ${launcher}`
      this.params.html = await this.component.buildSentence(launcher)
    }
  }
}

export default appLauncher
