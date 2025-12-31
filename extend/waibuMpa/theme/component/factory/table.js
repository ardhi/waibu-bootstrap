import { parseVariant, colors } from '../method/after-build-tag/_lib.js'
const cls = 'table'

function setStrip (params) {
  if (this.params.attr.strip === 'col') this.params.attr.class.push(`${cls}-striped-columns`)
  else this.params.attr.class.push(`${cls}-striped`)
}

function setResponsive (params) {
  const { isString } = this.app.lib._
  let xcls = `${cls}-responsive`
  if (isString(this.params.attr.responsive)) xcls += '-' + this.params.attr.responsive
  this.params.prepend = `<div class="${xcls}">`
  this.params.append = '</div>'
}

async function table () {
  return class Table extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { cls })
    }

    build = async () => {
      const { omit } = this.app.lib._
      if (this.params.attr.strip) setStrip.call(this, this.params)
      if (this.params.attr.responsive) setResponsive.call(this, this.params)
      if (this.params.attr.noBorder) this.params.attr.class.push(`${cls}-borderless`)
      else if (this.params.attr.border) this.params.attr.class.push(`${cls}-bordered`)
      if (this.params.attr.hover) this.params.attr.class.push(`${cls}-hover`)
      if (this.params.attr.topCaption) this.params.attr.class.push('caption-top')
      if (this.params.attr.size === 'small') this.params.attr.class.push(`${cls}-sm`)
      if (this.params.attr.color) this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.color, values: colors }))
      this.params.attr = omit(this.params.attr, ['strip', 'noBorder', 'border', 'hover', 'size'])
    }
  }
}

export default table
