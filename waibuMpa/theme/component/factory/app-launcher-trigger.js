async function appLauncherTrigger () {
  return class AppLauncherTrigger extends this.baseFactory {
    constructor (options) {
      super(options)
      const { isString } = this.plugin.lib._
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
      this.params.attr.padding = this.params.attr.padding ?? 'all-0'
      this.params.attr.imgDimWidth = this.params.attr.imgDimWidth ?? 48
      this.params.attr.imgDimHeight = this.params.attr.imgDimHeight ?? 48
    }

    build = async () => {
      const { fastGlob } = this.plugin.lib
      const { groupAttrs, attribsStringify } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['img'])
      this.params.attr = group._
      let src = group.img.src
      if (!src) {
        let logo = 'waibu'
        const files = await fastGlob(`${this.plugin.app.main.dir.pkg}/plugin/logo.*`)
        if (files.length > 0) logo = 'main'
        src = `waibuMpa:/logo/${logo}`
      }
      this.params.tag = 'a'
      const sentence = [
        `<c:img src="${src}"`,
        `width="${group.img.dimWidth}" height="${group.img.dimHeight}"`
      ]
      if (group.img.style) sentence.push(`style="${attribsStringify(group.img.style)}"`)
      sentence.push('/>')
      this.params.html = await this.component.buildSentence(sentence)
    }
  }
}

export default appLauncherTrigger
