async function navToggleFullscreen (params = {}) {
  if (!this.req.iconset) return
  const inIcon = this.iconset.resolve('fullscreen')
  const outIcon = this.iconset.resolve('fullscreenExit')
  const content = await this.buildTag({ tag: 'icon', attr: { oname: inIcon } })
  const attr = {
    'x-ref': 'fullscreen',
    '@click': 'toggle()',
    content
  }
  attr['@fullscreenchange.document'] = `
    const el = $refs.fullscreen.querySelector('i')
    if (document.fullscreenElement) {
      el.classList.remove(inIcon)
      el.classList.add(outIcon)
    } else {
      el.classList.remove(outIcon)
      el.classList.add(inIcon)
    }
  `
  attr['x-data'] = `{
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
  params.noTag = true
  params.html = await this.buildTag({ tag: 'navItem', attr })
}

export default navToggleFullscreen
