const cls = 'card-text'

const cardBody = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString } = this.plugin.app.bajo.lib._
    params.tag = isString(params.attr.tag) ? params.attr.tag : 'p'
    params.attr.class.push(cls)
  }
}

export default cardBody
