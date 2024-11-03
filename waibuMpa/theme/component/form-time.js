import { css, scripts, inlineScript, handler } from './form-datetime.js'

const formDatetime = {
  css,
  scripts,
  inlineScript,
  handler: async function (params = {}) {
    const { set } = this.plugin.app.bajo.lib._
    const opts = {}
    set(opts, 'display.components.calendar', false)
    set(opts, 'localization.format', 'LTS')
    await handler.call(this, opts, params)
  }
}

export default formDatetime
