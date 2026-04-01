import { css, scripts, inlineScript, handler } from './form-datetime.js'

async function formTime () {
  return class FormTime extends this.app.baseClass.MpaWidget {
    static css = [...super.css, ...css]
    static scripts = scripts
    static inlineScript = inlineScript

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
