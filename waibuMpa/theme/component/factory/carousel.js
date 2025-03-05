const cls = 'carousel'

async function carousel () {
  return class Carousel extends this.baseFactory {
    constructor (options) {
      super(options)
      const { isEmpty } = this.plugin.app.bajo.lib._
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls: [cls, 'slide'], autoId: true })
      if (this.params.attr.fade) this.params.attr.class.push(`${cls}-fade`)
      if (this.params.attr.noTouch) this.params.attr.dataBsTouch = false
      if (this.params.attr.autoPlay) this.params.attr.dataBsRide = isEmpty(this.params.attr.autoPlay) ? cls : this.params.attr.autoPlay
      this.params.html = `<div class="${cls}-inner">${this.params.html}</div>`
    }

    build = async () => {
      const { attrToArray } = this.plugin.app.waibuMpa
      const { $ } = this.component
      let activeItem = 0
      $(this.params.html).children().each(function (idx) {
        const classes = attrToArray(this.attribs.class)
        if (classes.includes('active')) activeItem = idx
      })
      this.params.html = $(this.params.html).children().each(function (idx) {
        if (idx === activeItem) $(this).addClass('active')
        $(this).find('img').addClass('d-block w-100')
      }).parent().prop('outerHTML')

      if (this.params.attr.indicator) {
        const count = $(this.params.html).children().length
        const btns = []
        for (let i = 0; i < count; i++) {
          btns.push(`<button type="button" data-bs-target="#${this.params.attr.id}" data-bs-slide-to="${i}"`)
          if (i === activeItem) btns.push('class="active" aria-current="true"')
          btns.push(`aria-label="Slide ${i + 1}"></button>`)
        }
        this.params.html = `<div class="${cls}-indicators">${btns.join(' ')}</div>\n${this.params.html}`
      }
      if (!this.params.attr.noNavigation) {
        const btns = []
        const dirs = { prev: 'Previous', next: 'Next' }
        for (const dir in dirs) {
          btns.push(`<button class="${cls}-control-${dir}" type="button" data-bs-target="#${this.params.attr.id}" data-bs-slide="${dir}">`)
          btns.push(`<span class="${cls}-control-${dir}-icon" aria-hidden="true"></span>`)
          btns.push(`<span class="visually-hidden">${this.component.req.t(dirs[dir])}</span></button>`)
        }
        this.params.html += '\n' + btns.join('\n')
      }
    }
  }
}

export default carousel
