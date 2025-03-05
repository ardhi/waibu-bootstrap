import { colors, parseVariant } from '../method/after-build-tag/_lib.js'

const cls = 'alert'

async function alert () {
  return class Alert extends this.baseFactory {
    constructor (options) {
      super(options)
      const { without } = this.plugin.app.bajo.lib._
      this.selector = '.' + cls
      const myColors = without(colors, 'link')
      this.component.normalizeAttr(this.params, { cls, tag: 'div', role: 'alert' })
      if (this.params.attr.color) this.params.attr.class.push(parseVariant.call(this, { cls, value: this.params.attr.color, values: myColors, prepend: true }))
    }

    build = async () => {
      const { isEmpty } = this.plugin.app.bajo.lib._
      const { $ } = this.component
      const html = $(`<div>${this.params.html}</div>`).children().each(function () {
        if (this.name === 'a') $(this).addClass('alert-link')
        if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(this.name)) $(this).addClass('alert-heading')
      }).parent().html()
      if (!isEmpty(html)) this.params.html = html
      if (this.params.attr.dismiss) {
        this.params.attr.class.push('alert-dismissible', 'fade', 'show')
        const attr = { 'data-bs-dismiss': 'alert' }
        this.params.html += await this.component.buildTag({ tag: 'btnClose', attr })
      }
    }
  }
}

export default alert
