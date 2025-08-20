async function navToggleFullscreen () {
  return class NavToggleFullscreen extends this.baseFactory {
    build = async () => {
      const { iconset, req } = this.component
      if (!req.iconset) return
      const inIcon = iconset.resolve('fullscreen')
      const outIcon = iconset.resolve('fullscreenExit')
      this.params.attr['x-ref'] = 'fullscreen'
      this.params.attr['@click'] = 'toggle()'
      this.params.attr.content = await this.component.buildTag({ tag: 'icon', attr: { oname: inIcon } })
      this.params.attr['@fullscreenchange.document'] = `
        const el = $refs.fullscreen.querySelector('i')
        if (document.fullscreenElement) {
          el.classList.remove(inIcon)
          el.classList.add(outIcon)
        } else {
          el.classList.remove(outIcon)
          el.classList.add(inIcon)
        }
      `
      this.params.attr['x-data'] = `{
        inIcon: '${inIcon}',
        outIcon: '${outIcon}',
        async toggle () {
          const el = document.querySelector('body')
          if (!document.fullscreenElement) {
            try {
              await el.requestFullscreen()

            } catch (err) {
              await wbs.notify('Can\\'t go fullscreen, sorry!', { type: 'danger' })
            }
          } else {
            document.exitFullscreen()
          }
        }
      }`
      this.params.noTag = true
      this.params.html = await this.component.buildTag({ tag: 'navItem', attr: this.params.attr, noEscape: true })
    }
  }
}

export default navToggleFullscreen
