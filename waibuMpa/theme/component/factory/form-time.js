import { css, scripts, inlineScript, handler } from './form-datetime.js'

async function formTime () {
  return class FormTime extends this.baseFactory {
    constructor (options) {
      super(options)
      this.css = css
      this.inlineScript = inlineScript
      this.scripts = scripts
    }

    build = async () => {
      const { set } = this.plugin.lib._
      const opts = {}
      set(opts, 'display.components.calendar', false)
      set(opts, 'localization.format', 'LTS')
      await handler.call(this, opts, this.params)
    }
  }
}

export default formTime
