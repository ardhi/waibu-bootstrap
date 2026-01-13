import { levels } from '../method/after-build-tag/_lib.js'
const cls = 'card-header'

export async function handler (cls, params = {}) {
  const headings = levels.map(l => `h${l}`)
  const { isString } = this.app.lib._
  const { $ } = this.component
  const tag = isString(this.params.attr.tag) && headings.includes(this.params.attr.tag) ? this.params.attr.tag : 'div'
  this.component.normalizeAttr(this.params, { tag, cls })
  const tabs = $(`<div>${this.params.html}</div>`).find('.nav-tabs')
  if (tabs.length > 0) this.params.html = tabs.addClass('card-header-tabs').parent().prop('outerHTML')
}

async function cardHeader () {
  return class CardHeader extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    build = async () => {
      await handler.call(this, cls, this.params)
    }
  }
}

export default cardHeader
