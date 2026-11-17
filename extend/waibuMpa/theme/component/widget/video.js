const cls = 'ratio'

async function video () {
  return class Video extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = `div[class^='${cls}']`
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }

    handleOlv = async () => {
      const { isString } = this.app.lib._
      const autoPlay = this.params.attr.autoPlay
      const popupAutoPlay = this.params.attr.popupAutoPlay
      this.params.html = `<iframe src="${this.params.attr.src}" frameborder="0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; ${autoPlay ? 'autoplay;' : ''} clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>`
      if (this.params.attr.popupSrc) {
        this.params.html += '<div style="position:absolute; top:0; left: 0; z-index:100; height:100%; width:100%"></div>'
        let src = isString(this.params.attr.popupSrc) ? this.params.attr.popupSrc : this.params.attr.src
        if (src.includes('youtube') && popupAutoPlay) src += '?autoplay=1'
        this.params.attr.role = 'button'
        this.params.attr['@click'] = 'await click()'
        this.params.attr['x-data'] = `{ async click () { 
          const id = wmpa.randomId()
          const body = '<c:modal scroll size=\\'lg\\' id=\\'' + id + '\\'><c:video ${popupAutoPlay ? 'auto-play' : ''} olv src=\\'${src}\\' dim=\\'height:100 width:100\\' /></c:modal>'
          return await wbs.openModal(id, body) 
        }}`
      }
    }

    build = async () => {
      const { importPkg } = this.app.bajo
      const mime = await importPkg('waibu:mime')
      const { isString } = this.app.lib._
      const ratio = this.params.attr.ratio || '4x3'
      this.params.attr.class.push(`${cls}-${ratio}`)
      if (this.params.attr.olv) return this.handleOlv()
      const mimeType = this.params.attr.mimeType ?? mime.getType(this.params.attr.src)
      const autoPlay = this.params.attr.autoPlay
      this.params.html = `<video ${this.params.attr.noControls ? '' : 'controls'} ${autoPlay ? 'autoplay' : ''}>` +
        `<source src="${this.params.attr.src}" type="${mimeType}">` +
        `${this.component.req.t('browserNotSupported')}</video>`
      if (this.params.attr.popupSrc) {
        const src = isString(this.params.attr.popupSrc) ? this.params.attr.popupSrc : this.params.attr.src
        const mimePopup = this.params.attr.popupMimeType ?? mime.getType(src)
        this.params.attr.role = 'button'
        this.params.attr['@click'] = 'await click()'
        this.params.attr['x-data'] = `{ async click () { 
          const id = wmpa.randomId()
          const body = '<c:modal scroll size=\\'lg\\' id=\\'' + id + '\\'><c:video ${this.params.attr.popupAutoPlay ? 'auto-play' : ''} src=\\'${src}\\' mime-type=\\'${mimePopup}\\' dim=\\'height:100 width:100\\' /></c:modal>'
          return await wbs.openModal(id, body) 
        }}`
      }
    }
  }
}

export default video
