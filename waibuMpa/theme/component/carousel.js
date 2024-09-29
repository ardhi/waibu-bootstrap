const cls = 'carousel'

const carousel = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isEmpty } = this.plugin.app.bajo.lib._
    const { attrToArray } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'div', cls: [cls, 'slide'], autoId: true })
    if (params.attr.fade) params.attr.class.push(`${cls}-fade`)
    if (params.attr.noTouch) params.attr.dataBsTouch = false
    if (params.attr.autoPlay) params.attr.dataBsRide = isEmpty(params.attr.autoPlay) ? cls : params.attr.autoPlay
    params.html = `<div class="${cls}-inner">${params.html}</div>`
    const $ = this.$
    let activeItem = 0
    $(params.html).children().each(function (idx) {
      const classes = attrToArray(this.attribs.class)
      if (classes.includes('active')) activeItem = idx
    })
    params.html = $(params.html).children().each(function (idx) {
      if (idx === activeItem) $(this).addClass('active')
      $(this).find('img').addClass('d-block w-100')
    }).parent().prop('outerHTML')

    if (params.attr.indicator) {
      const count = this.$(params.html).children().length
      const btns = []
      for (let i = 0; i < count; i++) {
        btns.push(`<button type="button" data-bs-target="#${params.attr.id}" data-bs-slide-to="${i}"`)
        if (i === activeItem) btns.push('class="active" aria-current="true"')
        btns.push(`aria-label="Slide ${i + 1}"></button>`)
      }
      params.html = `<div class="${cls}-indicators">${btns.join(' ')}</div>\n${params.html}`
    }
    if (!params.attr.noNavigation) {
      const btns = []
      const dirs = { prev: 'Previous', next: 'Next' }
      for (const dir in dirs) {
        btns.push(`<button class="${cls}-control-${dir}" type="button" data-bs-target="#${params.attr.id}" data-bs-slide="${dir}">`)
        btns.push(`<span class="${cls}-control-${dir}-icon" aria-hidden="true"></span>`)
        btns.push(`<span class="visually-hidden">${this.req.t(dirs[dir])}</span></button>`)
      }
      params.html += '\n' + btns.join('\n')
    }
  }
}

export default carousel
