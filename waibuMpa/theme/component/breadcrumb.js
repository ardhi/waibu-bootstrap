const cls = 'breadcrumb'

const breadcrumb = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    this._normalizeAttr(params, { tag: 'ol', cls })
    let divider = ''
    if (isString(params.attr.divider)) divider = ` style="--bs-breadcrumb-divider: '${params.attr.divider}';"`
    else if (params.attr.noDivider) divider = ' style="--bs-breadcrumb-divider: \'\';"'
    params.prepend = `<nav aria-label="breadcrumb"${divider}>`
    params.append = '</nav>'
    delete params.attr.divider
  }
}

export default breadcrumb
