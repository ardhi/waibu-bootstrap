const cls = 'img'

async function img (component) {
  return class Img extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = `img[class^='${cls}']`
      this.component.normalizeAttr(this.params)
      if (this.params.attr.responsive) this.params.attr.class.push(`${cls}-fluid`)
      if (this.params.attr.thumbnail) this.params.attr.class.push(`${cls}-thumbnail`)
      if (this.params.attr.holder) {
        if (!this.params.attr.holder.includes('?')) this.params.attr.holder += '?theme=industrial'
        this.params.attr.dataSrc = `holder.js/${this.params.attr.holder}`
      }
      delete this.params.attr.holder
    }
  }
}

export default img
