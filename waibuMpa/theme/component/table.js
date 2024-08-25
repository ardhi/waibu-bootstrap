const baseClass = 'table'

function setBorder (params) {
  if (params.attr.border === 'none') params.attr.class.push('table-borderless')
  else params.attr.class.push('table-bordered')
}

function setStrip (params) {
  if (params.attr.strip === 'col') params.attr.class.push('table-striped-columns')
  else params.attr.class.push('table-striped')
}

function setResponsive (params) {
  let cls = `${params.baseClass}-responsive`
  if (params.attr.responsive) cls += '-' + params.attr.responsive
  params.prepend = `<div class="${cls}">`
  params.append = '</div>'
}

const table = {
  selector: '.' + baseClass,
  handler: async function ({ params }) {
    params.attr.class.push(baseClass)
    params.baseClass = baseClass

    params.ezAttrs = [
      { key: 'border', value: setBorder },
      { key: 'strip', value: setStrip },
      { key: 'responsive', value: setResponsive },
      'variant', 'size', 'v-align', 'hover'
    ]
  }
}

export default table
