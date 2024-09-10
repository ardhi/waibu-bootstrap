const cls = 'lead'

const lead = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const tag = isString(params.attr.tag) ? params.attr.tag : 'p'
    this._normalizeAttr(params, { tag, cls })
  }
}

export default lead
