const cls = 'btn-group'

const btnGroup = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    const { has } = this._
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'group'
    if (has(params.attr, 'label')) params.attr['aria-label'] = params.attr.label
    delete params.attr.label
  }
}

export default btnGroup
