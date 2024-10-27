async function appLauncher (params = {}) {
  const { generateId } = this.plugin.app.bajo
  const { groupAttrs } = this.plugin.app.waibuMpa
  params.noTag = true
  params.attr.id = params.attr.id ?? generateId('alpha')
  params.attr.type = params.attr.type ?? 'drawer'
  const group = groupAttrs(params.attr, ['trigger'])
  let launcher = `<c:drawer id="${params.attr.id}" t:title="Modules">\n`
  if (params.attr.type === 'modal') launcher = `<c:modal id="${params.attr.id}" t:title="Modules" centered>\n`
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
  else launcher += '</c:drawer>'
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
