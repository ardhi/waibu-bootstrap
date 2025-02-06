const cls = 'img'

async function img () {
  return class Img extends this.baseFactory {
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

    async build () {
      const { isString } = this.plugin.app.bajo.lib._
      const mouseenter = []
      const mouseleave = []
      if (isString(this.params.attr['@mouseenter'])) mouseenter.push(...this.params.attr['@mouseenter'].split('\n'))
      if (isString(this.params.attr['@mouseleave'])) mouseleave.push(...this.params.attr['@mouseleave'].split('\n'))
      if (isString(this.params.attr.srcHover)) {
        this.params.attr.srcStby = this.params.attr.src
        mouseenter.unshift("$el.src = $el.getAttribute('src-hover')")
        mouseleave.unshift("$el.src = $el.getAttribute('src-stby')")
      }
      if (mouseenter.length > 0) this.params.attr['@mouseenter'] = mouseenter.join('\n')
      if (mouseleave.length > 0) this.params.attr['@mouseleave'] = mouseleave.join('\n')
    }
  }
}

export default img
