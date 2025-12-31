import { placements } from './_lib.js'

function popover ({ key, params }) {
  const { isString } = this.app.lib._
  if (isString(params.attr.popover) && params.attr.class.includes('btn')) {
    params.attr.dataBsToggle = 'popover'
    params.attr.dataBsContent = params.attr.popover
    if (params.attr.popoverTitle) params.attr.dataBsTitle = params.attr.popoverTitle
    if (placements.includes(params.attr.tooltipPlacement)) params.attr.dataBsPlacement = params.attr.tooltipPlacement
  }
  delete params.attr.popoverTitle
}

export default popover
