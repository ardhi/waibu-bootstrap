const cls = 'navbar-brand'

const navbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const tag = isString(params.attr.tag) ? params.attr.tag : 'a'
    this._normalizeAttr(params, { tag, cls })
    if (params.tag === 'a' && !params.attr.href) params.attr.href = '#'
    if (isString(params.attr.appLauncherTrigger)) {
      const attr = { open: params.attr.appLauncherTrigger }
      params.html = await this.buildTag({ tag: 'appLauncherTrigger', attr })
    }
    delete params.attr.appLauncherTrigger
  }
}

export default navbar
