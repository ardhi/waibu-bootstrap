import { levels } from './_after-build-tag/_lib.js'
const cls = 'card-header'

export async function handler (cls, params = {}) {
  const headings = levels.map(l => `h${l}`)
  const { isString } = this.plugin.app.bajo.lib._
  const tag = isString(params.attr.tag) && headings.includes(params.attr.tag) ? params.attr.tag : 'div'
  this._normalizeAttr(params, { tag, cls })
  const tabs = this.$(`<div>${params.html}</div>`).find('.nav-tabs')
  if (tabs.length > 0) params.html = tabs.addClass('card-header-tabs').parent().prop('outerHTML')
}

const cardHeader = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    await handler.call(this, cls, params)
  }
}

export default cardHeader
