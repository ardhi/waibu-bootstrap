import { css, scripts, inlineScript, handler } from './form-datetime.js'

const formDatetime = {
  css,
  scripts,
  inlineScript,
  handler: async function (params = {}) {
    const { set } = this.plugin.app.bajo.lib._
    const opts = {}
    if (params.attr.calendarWeeks) set(opts, 'display.calendarWeeks', true)
    set(opts, 'display.components.clock', false)
    set(opts, 'localization.format', 'L')
    set(opts, 'display.buttons.today', true)
    set(opts, 'display.buttons.clear', true)
    if (params.attr.dateRange) set(opts, 'dateRange', true)
    await handler.call(this, opts, params)
  }
}

export default formDatetime
