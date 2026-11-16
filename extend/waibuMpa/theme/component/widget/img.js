const cls = 'img'

async function img () {
  return class Img extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      const { isString } = this.app.lib._
      this.selector = `img[class^='${cls}']`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.responsive) this.params.attr.class.push(`${cls}-fluid`)
      if (this.params.attr.thumbnail) this.params.attr.class.push(`${cls}-thumbnail`)
      if (this.params.attr.holder) {
        if (!this.params.attr.holder.includes('?')) this.params.attr.holder += '?theme=industrial'
        this.params.attr.dataSrc = `holder.js/${this.params.attr.holder}`
      }
      delete this.params.attr.holder
      if (this.params.attr.srcPopup) {
        const srcPopup = isString(this.params.attr.srcPopup) ? this.params.attr.srcPopup : this.params.attr.src
        this.params.attr.role = 'button'
        this.params.attr['@click'] = 'await click()'
        this.params.attr['x-data'] = `{ async click () { 
          const id = wmpa.randomId()
          const body = '<c:modal scroll size=\\'lg\\' id=\\'' + id + '\\'><c:img responsive src=\\'${srcPopup}\\' dim=\\'height:100 width:100\\' /></c:modal>'
          return await wbs.openModal(id, body) 
        }}`
      }
    }

    build = async () => {
    }
  }
}

export default img
