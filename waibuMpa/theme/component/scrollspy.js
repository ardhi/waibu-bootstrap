const cls = 'scrollspy'

const scrollspy = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const { generateId } = this.plugin.app.bajo
    const target = isString(params.attr.target) ? params.attr.target : generateId()
    this._normalizeAttr(params, {
      tag: 'div',
      dataBsSpy: 'scroll',
      tabIndex: '0',
      dataBsSmoothScrol: 'true',
      dataBsTarget: target
    })
  }
}

export default scrollspy
