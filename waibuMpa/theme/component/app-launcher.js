async function appLauncher (params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { groupAttrs, attrToArray } = this.plugin.app.waibuMpa
  params.noTag = true
  params.attr.id = params.attr.id ?? generateId('alpha')
  params.attr.type = params.attr.type ?? 'drawer'
  const group = groupAttrs(params.attr, ['trigger'])
  let launcher = `<c:drawer id="${params.attr.id}" t:title="Modules" no-padding>\n`
  launcher += '<c:div padding="start-3 bottom-3 end-3">'
  if (params.attr.type === 'modal') launcher = `<c:modal id="${params.attr.id}" t:title="Modules" centered>\n`
  const toolbar = attrToArray(params.attr.toolbar)
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
  for (const m of (this.locals.menu.homes ?? [])) {
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
  if (params.attr.type === 'modal') launcher += '</c:modal>'
  else launcher += '</c:div></c:drawer>'
  let trigger = ''
  if (group.trigger) {
    params.attr = group._
    group.trigger.open = `${params.attr.id}:drawer`
    trigger = await this.buildTag({ tag: 'appLauncherTrigger', attr: group.trigger })
  }
  launcher = `${trigger} ${launcher}`
  params.html = await this.buildSentence(launcher)
}

export default appLauncher
