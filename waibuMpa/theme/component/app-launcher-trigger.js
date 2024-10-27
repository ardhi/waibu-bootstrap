async function appLauncher (params = {}) {
  const { fastGlob } = this.plugin.app.bajo.lib
  const { isString } = this.plugin.app.bajo.lib._
  let logo = 'waibu'
  const files = await fastGlob(`${this.plugin.app.main.dir.pkg}/bajo/logo.*`)
  if (files.length > 0) logo = 'main'
  params.tag = 'a'
  params.attr.color = params.attr.color ?? 'color:body-emphasis'
  params.attr.text = params.attr.text ?? 'decoration:none'
  params.attr.display = 'type:block'
  params.attr.flex = 'justify-content:center align-items:center'
  params.attr.href = params.attr.href ?? '#'
  if (isString(params.attr.open)) {
    const [id, type = 'modal'] = params.attr.open.split(':')
    params.attr['data-bs-target'] = `#${id}`
    params.attr['data-bs-toggle'] = type === 'drawer' ? 'offcanvas' : type
    params.attr['aria-controls'] = id
  }
  params.html = await this.buildSentence(`<c:img height="56" src="waibuMpa:/logo/${logo}" />`)
}

export default appLauncher
