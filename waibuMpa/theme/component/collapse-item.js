const cls = 'collapse'

const collapseItem = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    const { generateId } = this.plugin.app.bajo
    params.attr.class.push(cls)
    if (params.attr.showOnStart) params.attr.class.push('show')
    params.attr.id = isString(params.attr, 'id') ? params.attr.id : generateId()
    params.tag = 'div'
  }
}

export default collapseItem
