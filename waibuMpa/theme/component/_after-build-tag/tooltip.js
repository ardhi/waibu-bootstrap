function tooltip ({ key, params }) {
  const { isString } = this.plugin.app.bajo.lib._
  if (isString(params.attr.tooltip) && (params.attr.class.includes('btn') || params.tag === 'a' || params.attr.tag === 'a')) {
    params.attr.dataBsToggle = 'tooltip'
    params.attr.dataBsTitle = params.attr.tooltip
  }
}

export default tooltip
