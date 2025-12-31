async function appLauncher () {
  return class AppLauncher extends this.baseFactory {
    constructor (options) {
      super(options)
      const { generateId } = this.app.lib.aneka
      this.params.noTag = true
      this.params.attr.id = this.params.attr.id ?? generateId('alpha')
      this.params.attr.type = this.params.attr.type ?? 'drawer'
    }

    build = async () => {
      const { locals } = this.component
      const { routePath } = this.app.waibu
      const { groupAttrs, attrToArray } = this.app.waibuMpa
      const menu = this.params.attr.menu ?? 'pages'
      const group = groupAttrs(this.params.attr, ['trigger'])
      let launcher = `<c:drawer id="${this.params.attr.id}" t:title="Modules" no-padding style="${menu === 'pages' ? 'width:350px' : ''}">\n`
      if (this.params.attr.type === 'modal') launcher = `<c:modal id="${this.params.attr.id}" t:title="Modules" centered>\n`
      const toolbar = attrToArray(this.params.attr.toolbar)
      if (toolbar.length > 0) {
        if (menu === 'pages') toolbar.unshift('home')
        launcher += `<c:div padding="x-3 ${menu === 'home' ? 'bottom-3' : ''}">`
        launcher += '<c:navbar padding="y-0"><c:nav tag="ul">\n'
        if (locals._meta.isAdmin) launcher += '<c:nav-item text="color:danger" href="' + routePath('waibuAdmin:/') + '" icon="lock" padding="start-0" />\n'
        launcher += '</c:nav>\n<c:nav tag="ul">\n'
        for (const t of toolbar) {
          if (t === 'home') launcher += '<c:nav-item href="/" icon="house" padding="end-2" />\n'
          if (t === 'user' && this.app.sumba) launcher += '<c:sumba-nav-dropdown-user padding="end-2" />\n'
          if (t === '-') launcher += '<c:nav-divider />\n'
          if (t === 'fullscreen') launcher += '<c:nav-toggle-fullscreen padding="end-2" />\n'
          if (t === 'darkmode') launcher += '<c:nav-dropdown-darkmode padding="end-2" dropdown-menudir="end" />\n'
          if (t === 'language') launcher += '<c:nav-dropdown-language padding="end-2" dropdown-menudir="end" />\n'
        }
        launcher += '</c:nav></c:navbar></c:div>\n'
      }
      const items = this.component.locals.menu[menu] ?? []
      if (menu === 'pages') {
        launcher += '<c:hr margin="all-0" /><c:accordion no-border>\n'
        for (const m of items) {
          const sm = []
          if (!m.children) continue
          for (const s of m.children) {
            if (s.visible === 'anon' && this.component.locals._meta.user) continue
            if (s.visible === 'auth' && !this.component.locals._meta.user) continue
            if (s.title === '-') continue
            sm.push(`<c:list-item href="${s.href}" t:content="${s.title}" style="padding-left:1.2rem"/>`)
          }
          launcher += `
            <c:accordion-item t:header="${m.title}" body-no-padding header-font="weight:bold">\n
            <c:list type="group" hover no-border>\n
            ${sm.join('\n')}\n
            </c:list>\n
            </c:accordion-item>\n
          `
        }
      } else {
        launcher += '<c:div padding="start-3 bottom-3 end-3">'
        launcher += '<c:grid-row gutter="1">\n'
        for (const m of items) {
          launcher += `
            <c:grid-col col="4" text="align:center">
              <c:a href="${m.href}" display="type:block" border rounded padding="all-2" text="decoration:none">
                <c:img src="waibuMpa:/logo/${m.ns}" class="app-launcher-img" height="60" fluid/>
                <c:div margin="top-2">${m.title}</c:div>
              </c:a>
            </c:grid-col>
          `
        }
        launcher += '</c:grid-row></c:div>\n'
      }
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
