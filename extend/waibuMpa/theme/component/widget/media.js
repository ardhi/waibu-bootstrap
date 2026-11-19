import { buildVideo } from './video.js'
import { buildImg } from './img.js'
import path from 'path'

async function media () {
  return class Media extends this.app.baseClass.MpaWidget {
    build = async () => {
      const { importPkg } = this.app.bajo
      const mime = await importPkg('waibu:mime')
      const src = (this.params.attr.src ?? '').split('?')[0].split('#')[0]
      const mimeType = mime.getType(src) ?? ''
      const ext = path.extname(src).toLowerCase()
      if (ext === '.olv' || mimeType.startsWith('video/')) return await buildVideo.call(this)
      if (mimeType.startsWith('image/')) return await buildImg.call(this)
    }
  }
}

export default media
