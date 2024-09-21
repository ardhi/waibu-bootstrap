import { parseVariant, colors } from './_after-build-tag/_lib.js'
const cls = 'table'

function setStrip (params) {
  if (params.attr.strip === 'col') params.attr.class.push(`${cls}-striped-columns`)
  else params.attr.class.push(`${cls}-striped`)
}

function setResponsive (params) {
  let xcls = `${cls}-responsive`
  if (params.attr.responsive) xcls += '-' + params.attr.responsive
  params.prepend = `<div class="${xcls}">`
  params.append = '</div>'
}

const table = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { cls })
    if (params.attr.strip) setStrip.call(this, params)
    if (params.attr.responsive) setResponsive.call(this, params)
    if (params.attr.noBorder) params.attr.class.push(`${cls}-borderless`)
    else if (params.attr.border) params.attr.class.push(`${cls}-bordered`)
    if (params.attr.hover) params.attr.class.push(`${cls}-hover`)
    if (params.attr.topCaption) params.attr.class.push('caption-top')
    if (params.attr.size === 'sm') params.attr.class.push(`${cls}-sm`)
    if (params.attr.color) params.attr.class.push(parseVariant.call(this, { cls, value: params.attr.color, values: colors }))
    params.attr = omit(params.attr, ['strip', 'noBorder', 'border', 'hover', 'size'])
  }
}

export default table
