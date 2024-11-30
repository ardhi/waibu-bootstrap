const cls = 'scrollspy'

async function scrollspy (component) {
  return class Scrollspy extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    async build () {
      const { isString } = this.plugin.app.bajo.lib._
      const { generateId } = this.plugin.app.bajo
      const target = isString(this.params.attr.target) ? this.params.attr.target : generateId()
      this.component.normalizeAttr(this.params, {
        tag: 'div',
        dataBsSpy: 'scroll',
        tabIndex: '0',
        dataBsSmoothScrol: 'true',
        dataBsTarget: target
      })
    }
  }
}

export default scrollspy
