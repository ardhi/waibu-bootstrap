import gutter from '../method/after-build-tag/gutter.js'

async function masonry (component) {
  return class Masonry extends component.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params)
      this.params.noTag = true
    }

    async build () {
      const { pick } = this.plugin.app.bajo.lib._
      const { attribsStringify } = this.plugin.app.waibuMpa

      const gparams = { attr: pick(this.params.attr, ['gutter']) }
      gparams.attr.class = ['row']
      gutter.call(this, { params: gparams })
      delete gparams.attr.gutter

      this.params.prepend = `<div ${attribsStringify(gparams.attr)} data-masonry='{ "percentPosition": true }'>`
      this.params.append = '</div>'
      const me = this
      const html = []
      this.component.$(`<div>${this.params.html}</div>`).children().each(function () {
        html.push(me.$(this).prop('outerHTML'))
      })
      this.params.html = html.map(item => {
        return `<div class="col-sm-6 col-lg-4">${item}</div>`
      }).join('\n')
    }
  }
}

export default masonry
