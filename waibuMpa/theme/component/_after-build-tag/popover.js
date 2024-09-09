function popover ({ key, params }) {
  const { isString } = this.plugin.app.bajo.lib._
  if (isString(params.attr.popover) && params.attr.class.includes('btn')) {
    params.attr.dataBsToggle = 'popover'
    params.attr.dataBsContent = params.attr.popover
    if (params.attr.popoverTitle) params.attr.dataBsTitle = params.attr.popoverTitle
  }
  delete params.attr.popoverTitle
}

export default popover
