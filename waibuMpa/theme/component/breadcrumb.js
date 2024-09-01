const cls = 'breadcrumb'

const breadcrumb = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'ol'
    params.attr.class.push(cls)
    let divider = ''
    if (has(params.attr, 'divider')) divider = ` style="--bs-breadcrumb-divider: '${params.attr.divider}';"`
    params.prepend = `<nav aria-label="breadcrumb"${divider}>`
    params.append = '</nav>'
    delete params.attr.divider
  }
}

export default breadcrumb
