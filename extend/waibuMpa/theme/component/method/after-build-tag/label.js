function label ({ key, params }) {
  const { isString } = this.app.lib._
  if (isString(params.attr.label)) params.attr.ariaLabel = params.attr.label
}

export default label
