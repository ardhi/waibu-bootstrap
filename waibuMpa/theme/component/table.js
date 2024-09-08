const cls = 'table'

function setBorder (params) {
  if (params.attr.border === 'none') params.attr.class.push('table-borderless')
  else params.attr.class.push('table-bordered')
}

function setStrip (params) {
  if (params.attr.strip === 'col') params.attr.class.push('table-striped-columns')
  else params.attr.class.push('table-striped')
}

function setResponsive (params) {
  let cls = `${params.cls}-responsive`
  if (params.attr.responsive) cls += '-' + params.attr.responsive
  params.prepend = `<div class="${cls}">`
  params.append = '</div>'
}

const table = {
  selector: '.' + cls,
  handler: async function ({ params }) {
    params.attr.class.push(cls)
    if (params.attr.border) setBorder.call(this, params)
    if (params.attr.strip) setStrip.call(this, params)
    if (params.attr.responsive) setResponsive.call(this, params)
  }
}

export default table
