async function appLauncher (params = {}) {
  params.noTag = true
  let html = '<c:drawer id="app-launcher" t:title="Modules">\n'
  if (params.attr.type === 'modal') html = '<c:modal id="app-launcher" t:title="Modules" centered>\n'
  html += '<c:grid-row gutter="1">\n'
  for (const m of (this.locals.menu.homes ?? [])) {
    html += `
      <c:grid-col col="4" text="align:center">
        <c:a href="${m.href}" display="type:block" border rounded padding="all-2" text="decoration:none">
          <c:img src="waibuMpa:/logo/${m.ns}" height="60" fluid/>
          <c:div margin="top-2">${m.title}</c:div>
        </c:a>
      </c:grid-col>
    `
  }
  html += '</c:grid-row>\n'
  if (params.attr.type === 'modal') html += '</c:modal>'
  else html += '</c:drawer>'
  params.html = await this.buildSentence(html)
}

export default appLauncher
