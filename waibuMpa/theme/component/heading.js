async function heading (params = {}) {
  const { omit } = this.plugin.app.bajo.lib._
  const type = params.attr.type ?? '1'
  params.tag = 'h' + type
  if (params.attr.tag) {
    params.attr.class.push('h' + type)
    params.tag = params.attr.tag
  }
  params.attr = omit(params.attr, ['type', 'tag'])
}

export default heading
