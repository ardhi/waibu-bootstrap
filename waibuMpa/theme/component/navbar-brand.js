const cls = 'navbar-brand'

const navbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const tag = isString(params.attr.tag) ? params.attr.tag : 'a'
    this._normalizeAttr(params, { tag, cls })
    if (params.tag === 'a' && !params.attr.href) params.attr.href = '#'
  }
}

export default navbar
