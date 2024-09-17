import gutter from './_after-build-tag/gutter.js'

async function masonry (params = {}) {
  const { pick } = this.plugin.app.bajo.lib._
  const { attribsStringify } = this.plugin.app.waibuMpa
  this._normalizeAttr(params)
  params.noTag = true

  const gparams = { attr: pick(params.attr, ['gutter']) }
  gparams.attr.class = ['row']
  gutter.call(this, { params: gparams })
  delete gparams.attr.gutter

  params.prepend = `<div ${attribsStringify(gparams.attr)} data-masonry='{ "percentPosition": true }'>`
  params.append = '</div>'
  const me = this
  const html = []
  this.$(`<div>${params.html}</div>`).children().each(function () {
    html.push(me.$(this).prop('outerHTML'))
  })
  params.html = html.map(item => {
    return `<div class="col-sm-6 col-lg-4">${item}</div>`
  }).join('\n')
}

export default masonry
