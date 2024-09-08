async function masonry (params = {}) {
  params.noTag = true
  params.prepend = '<div class="row g-2" data-masonry=\'{ "percentPosition": true }\'>'
  params.append = '</div>'
  // params.attr.dataMasonry = '{\"percentPosition\": true }'
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
