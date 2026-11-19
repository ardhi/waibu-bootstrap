export async function buildImg () {
  const { isString } = this.app.lib._
  const cls = 'img'
  this.selector = `img[class^='${cls}']`
  this.component.normalizeAttr(this.params, { tag: 'img' })
  if (this.params.attr.responsive) this.params.attr.class.push(`${cls}-fluid`)
  if (this.params.attr.thumbnail) this.params.attr.class.push(`${cls}-thumbnail`)
  if (this.params.attr.holder) {
    if (!this.params.attr.holder.includes('?')) this.params.attr.holder += '?theme=industrial'
    this.params.attr.dataSrc = `holder.js/${this.params.attr.holder}`
  }
  delete this.params.attr.holder
  if (this.params.attr.popupSrc) {
    const popupSrc = isString(this.params.attr.popupSrc) ? this.params.attr.popupSrc : this.params.attr.src
    this.params.attr.role = 'button'
    this.params.attr['@click'] = 'await click()'
    this.params.attr['x-data'] = `{ async click () { 
      const id = wmpa.randomId()
      const body = '<c:modal scroll size=\\'lg\\' id=\\'' + id + '\\'><c:img responsive src=\\'${popupSrc}\\' dim=\\'height:100 width:100\\' /></c:modal>'
      return await wbs.openModal(id, body) 
    }}`
  }
}

async function img () {
  return class Img extends this.app.baseClass.MpaWidget {
    build = async () => {
      await buildImg.call(this)
    }
  }
}

export default img
