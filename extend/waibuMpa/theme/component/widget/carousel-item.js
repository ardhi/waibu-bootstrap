const cls = 'carousel-item'

async function carouselItem () {
  return class CarouselItem extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls, dataBsInterval: this.params.attr.interval })
    }

    build = async () => {
      const { isString } = this.app.lib._
      if (isString(this.params.attr.caption)) {
        const captions = ['<div class="carousel-caption d-none d-md-block">']
        captions.push(`<h5>${this.params.attr.caption}</h5>`)
        if (isString(this.params.attr.description)) captions.push(`<p>${this.params.attr.description}</p>`)
        captions.push('</div>')
        this.params.html += `\n${captions.join('\n')}`
      }
      delete this.params.attr.caption
    }
  }
}

export default carouselItem
