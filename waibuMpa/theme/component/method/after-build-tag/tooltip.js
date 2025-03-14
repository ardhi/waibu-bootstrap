import { placements } from './_lib.js'
const classes = ['btn', 'nav-link']

function tooltip ({ key, params }) {
  const { includes } = this.plugin.app.bajo
  const { isString } = this.plugin.lib._
  if (isString(params.attr.tooltip) && (includes(params.attr.class, classes) || params.tag === 'a' || params.attr.tag === 'a')) {
    params.attr.dataBsToggle = 'tooltip'
    params.attr.dataBsTitle = params.attr.tooltip
    if (placements.includes(params.attr.tooltipPlacement)) params.attr.dataBsPlacement = params.attr.tooltipPlacement
  }
}

export default tooltip
