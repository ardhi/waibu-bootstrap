const cls = 'breadcrumb-item'

const breadcrumbItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'li'
    params.attr.class.push(cls)
  }
}

export default breadcrumbItem
