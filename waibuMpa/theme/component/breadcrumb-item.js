const cls = 'breadcrumb-item'

const breadcrumbItem = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'li'
    params.attr.class.push(cls)
    if (has(params.attr, 'active')) params.attr.class.push('active')
    delete params.attr.active
  }
}

export default breadcrumbItem
