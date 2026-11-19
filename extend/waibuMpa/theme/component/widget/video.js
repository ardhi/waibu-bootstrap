import path from 'path'

async function handleOlv (isOlv) {
  const { isString } = this.app.lib._
  const { fs } = this.app.lib
  const { pascalCase } = this.app.lib.aneka
  const autoPlay = this.params.attr.autoPlay
  const popupAutoPlay = this.params.attr.popupAutoPlay
  let source = this.params.attr.src
  if (isOlv) {
    const root = `${this.app.getPluginDataDir('dobo')}/attachment`
    const parts = this.params.attr.src.replace('/db/attachment/', '').split('/')
    const model = pascalCase(parts.shift())
    const file = path.join(root, model, parts.join('/'))
    const content = fs.readFileSync(file, 'utf-8')
    source = content.trim()
  }
  const elClass = this.params.attr.elClass ? `class="${this.params.attr.elClass}"` : ''
  const attr = 'allowfullscreen referrerpolicy="strict-origin-when-cross-origin" ' +
    `allow="accelerometer; ${autoPlay ? 'autoplay;' : ''} clipboard-write; encrypted-media; gyroscope; picture-in-picture"`
  this.params.html = `<iframe ${elClass} src="${source}" frameborder="0" ${attr}></iframe>`
  if (this.params.attr.popupSrc) {
    let src = isString(this.params.attr.popupSrc) ? this.params.attr.popupSrc : source
    if (src.includes('youtube') && popupAutoPlay) src += '?autoplay=1'
    this.params.attr.role = 'button'
    this.params.attr['@click'] = 'await click()'
    this.params.attr['x-data'] = `{ async click () { 
      const id = wmpa.randomId()
      const body = '<c:modal scroll size=\\'lg\\' id=\\'' + id + '\\'><c:video ${popupAutoPlay ? 'auto-play' : ''} olv src=\\'${src}\\' dim=\\'height:100 width:100\\' /></c:modal>'
      return await wbs.openModal(id, body) 
    }}`
  }
  if (this.params.attr.noControls || this.params.attr.popupSrc) this.params.html += '<div style="position:absolute; top:0; left: 0; z-index:100; height:100%; width:100%"></div>'
}

export async function buildVideo () {
  const { importPkg } = this.app.bajo
  const mime = await importPkg('waibu:mime')
  const cls = 'ratio'

  this.selector = `div[class^='${cls}']`
  this.component.normalizeAttr(this.params, { tag: 'div', cls })
  const { isString } = this.app.lib._
  const ratio = this.params.attr.ratio || '16x9'
  this.params.attr.class.push(`${cls}-${ratio}`)
  const ext = path.extname(this.params.attr.src).toLowerCase()
  if (ext === '.olv' || this.params.attr.olv) return await handleOlv.call(this, ext === '.olv')
  const mimeType = this.params.attr.mimeType ?? mime.getType(this.params.attr.src)
  const autoPlay = this.params.attr.autoPlay
  const elClass = this.params.attr.elClass ? `class="${this.params.attr.elClass}"` : ''
  this.params.html = `<video ${elClass} ${this.params.attr.noControls ? '' : 'controls'} ${autoPlay ? 'autoplay' : ''}>` +
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

async function video () {
  return class Video extends this.app.baseClass.MpaWidget {
    build = async () => {
      await buildVideo.call(this)
      delete this.params.attr.src
    }
  }
}

export default video
