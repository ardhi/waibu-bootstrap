const cls = 'carousel-item'

const carouselItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    if (params.attr.active) params.attr.class.push('active')
    params.attr.dataBsInterval = params.attr.interval
    if (isString(params.attr.caption)) {
      const captions = ['<div class="carousel-caption d-none d-md-block">']
      captions.push(`<h5>${params.attr.caption}</h5>`)
      if (isString(params.attr.captionsInfo)) captions.push(`<p>${params.attr.captionInfo}</p>`)
      captions.push('</div>')
      params.html += `\n${captions.join('\n')}`
    }
  }
}

export default carouselItem
