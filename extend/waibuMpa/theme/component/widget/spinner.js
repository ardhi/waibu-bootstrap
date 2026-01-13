import { sizes, parseSimple } from '../method/after-build-tag/_lib.js'
const types = ['border', 'grow']

async function spinner () {
  return class Spinner extends this.app.baseClass.MpaWidget {
    constructor (options) {
      super(options)
      const type = types.includes(this.params.attr.type) ? this.params.attr.type : 'border'
      const cls = `spinner-${type}`
      this.component.normalizeAttr(this.params, { tag: 'div', cls, role: 'status' })
      if (this.params.attr.size) this.params.attr.class.push(parseSimple.call(this, { cls, value: this.params.attr.size, values: sizes }))
      this.params.html = `<span class="visually-hidden">${this.component.req.t('Loading...')}</span>`
    }
  }
}

export default spinner
