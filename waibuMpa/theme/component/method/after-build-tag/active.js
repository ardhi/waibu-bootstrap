function active ({ key, params }) {
  const { isString } = this.plugin.lib._
  params.attr.class.push(key)
  params.attr.ariaCurrent = isString(params.attr[key]) ? params.attr[key] : 'true'
}

export default active
