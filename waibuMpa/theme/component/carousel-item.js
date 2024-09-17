const cls = 'carousel-item'

const carouselItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { tag: 'div', cls, dataBsInterval: params.attr.interval })
    if (isString(params.attr.caption)) {
      const captions = ['<div class="carousel-caption d-none d-md-block">']
      captions.push(`<h5>${params.attr.caption}</h5>`)
      if (isString(params.attr.description)) captions.push(`<p>${params.attr.description}</p>`)
      captions.push('</div>')
      params.html += `\n${captions.join('\n')}`
    }
    delete params.attr.caption
  }
}

export default carouselItem
