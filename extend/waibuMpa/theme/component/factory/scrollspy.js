const cls = 'scrollspy'

async function scrollspy () {
  return class Scrollspy extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    build = async () => {
      const { isString } = this.plugin.lib._
      const { generateId } = this.plugin.app.bajo
      const target = isString(this.params.attr.target) ? this.params.attr.target : generateId()
      this.component.normalizeAttr(this.params, {
        tag: 'div',
        dataBsSpy: 'scroll',
        tabIndex: '0',
        dataBsSmoothScroll: 'true',
        dataBsTarget: target
      })
    }
  }
}

export default scrollspy
