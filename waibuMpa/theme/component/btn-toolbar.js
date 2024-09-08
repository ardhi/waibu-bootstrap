const cls = 'btn-toolbar'

const btnToolbar = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    params.tag = 'div'
    params.attr.class.push(cls)
    params.attr.role = 'toolbar'
    if (isString(params.attr.label)) params.attr.ariaLabel = params.attr.label
    delete params.attr.label
  }
}

export default btnToolbar
