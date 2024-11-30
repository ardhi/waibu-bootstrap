function label ({ key, params }) {
  const { isString } = this.plugin.app.bajo.lib._
  if (isString(params.attr.label)) params.attr.ariaLabel = params.attr.label
}

export default label
