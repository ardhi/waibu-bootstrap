import { levels } from '../method/after-build-tag/_lib.js'
const cls = 'card-header'

export async function handler (cls, params = {}) {
  const headings = levels.map(l => `h${l}`)
  const { isString } = this.plugin.app.bajo.lib._
  const tag = isString(this.params.attr.tag) && headings.includes(this.params.attr.tag) ? this.params.attr.tag : 'div'
  this.component.normalizeAttr(this.params, { tag, cls })
  const tabs = this.component.$(`<div>${this.params.html}</div>`).find('.nav-tabs')
  if (tabs.length > 0) this.params.html = tabs.addClass('card-header-tabs').parent().prop('outerHTML')
}

async function cardHeader (component) {
  return class CardHeader extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    async build () {
      await handler.call(this, cls, this.params)
    }
  }
}

export default cardHeader
