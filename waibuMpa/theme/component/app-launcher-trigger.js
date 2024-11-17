async function appLauncherTrigger (params = {}) {
  const { fastGlob } = this.plugin.app.bajo.lib
  const { get, isString, omit, merge } = this.plugin.app.bajo.lib._
  let logo = 'waibu'
  const files = await fastGlob(`${this.plugin.app.main.dir.pkg}/bajo/logo.*`)
  if (files.length > 0) logo = 'main'
  params.tag = 'a'
  const logoStyle = get(this, `plugin.app.${logo}.config.waibu.logoStyle`)
  if (logoStyle) params.attr.style = merge({}, logoStyle, params.attr.style)
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
  params.attr.padding = params.attr.padding ?? 'all-1'
  params.attr.imgDimWidth = params.attr.imgDimWidth ?? 48
  params.attr.imgDimHeight = params.attr.imgDimHeight ?? 48
  params.html = await this.buildSentence(`<c:img width="${params.attr.imgDimWidth}" height="${params.attr.imgDimHeight}" src="waibuMpa:/logo/${logo}" />`)
  params.attr = omit(params.attr, ['imgDimHeight', 'imgDimWidth'])
}

export default appLauncherTrigger
