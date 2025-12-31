import { css, scripts, inlineScript, handler } from './form-datetime.js'

async function formTime () {
  return class FormTime extends this.baseFactory {
    static css = [...super.css, ...css]
    static scripts = [...super.scripts, ...scripts(this.component.req)]
    static inlineScript = inlineScript(this.component.req)

    build = async () => {
      const { set } = this.app.lib._
      const opts = {}
      set(opts, 'display.components.calendar', false)
      set(opts, 'localization.format', 'LTS')
      await handler.call(this, opts, this.params)
    }
  }
}

export default formTime
