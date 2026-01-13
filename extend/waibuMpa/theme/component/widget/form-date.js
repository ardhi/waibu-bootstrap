import { css, scripts, inlineScript, handler } from './form-datetime.js'

async function formDate () {
  return class FormDate extends this.app.baseClass.MpaWidget {
    static css = [...super.css, ...css]
    static scripts = [...super.scripts, ...scripts(this.component.req)]
    static inlineScript = inlineScript(this.component.req)

    build = async () => {
      const { set } = this.app.lib._
      const opts = {}
      if (this.params.attr.calendarWeeks) set(opts, 'display.calendarWeeks', true)
      set(opts, 'display.components.clock', false)
      set(opts, 'localization.format', 'L')
      set(opts, 'display.buttons.today', true)
      set(opts, 'display.buttons.clear', true)
      if (this.params.attr.dateRange) set(opts, 'dateRange', true)
      await handler.call(this, opts, this.params)
    }
  }
}

export default formDate
