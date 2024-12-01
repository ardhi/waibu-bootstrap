async function appLauncherTrigger () {
  return class AppLauncherTrigger extends this.baseFactory {
    constructor (options) {
      super(options)
      const { isString } = this.plugin.app.bajo.lib._
      this.params.attr.color = this.params.attr.color ?? 'color:body-emphasis'
      this.params.attr.text = this.params.attr.text ?? 'decoration:none'
      this.params.attr.display = 'type:block'
      this.params.attr.flex = 'justify-content:center align-items:center'
      this.params.attr.href = this.params.attr.href ?? '#'
      if (isString(this.params.attr.open)) {
        const [id, type = 'modal'] = this.params.attr.open.split(':')
        this.params.attr['data-bs-target'] = `#${id}`
        this.params.attr['data-bs-toggle'] = type === 'drawer' ? 'offcanvas' : type
        this.params.attr['aria-controls'] = id
      }
      this.params.attr.padding = this.params.attr.padding ?? 'all-1'
      this.params.attr.imgDimWidth = this.params.attr.imgDimWidth ?? 48
      this.params.attr.imgDimHeight = this.params.attr.imgDimHeight ?? 48
    }

    async build () {
      const { fastGlob } = this.plugin.app.bajo.lib
      const { get, omit, merge } = this.plugin.app.bajo.lib._
      let logo = 'waibu'
      const files = await fastGlob(`${this.plugin.app.main.dir.pkg}/bajo/logo.*`)
      if (files.length > 0) logo = 'main'
      this.params.tag = 'a'
      const logoStyle = get(this, `plugin.app.${logo}.config.waibu.logoStyle`)
      if (logoStyle) this.params.attr.style = merge({}, logoStyle, this.params.attr.style)
      this.params.html = await this.component.buildSentence(`<c:img width="${this.params.attr.imgDimWidth}" height="${this.params.attr.imgDimHeight}" src="waibuMpa:/logo/${logo}" />`)
      this.params.attr = omit(this.params.attr, ['imgDimHeight', 'imgDimWidth'])
    }
  }
}

export default appLauncherTrigger
