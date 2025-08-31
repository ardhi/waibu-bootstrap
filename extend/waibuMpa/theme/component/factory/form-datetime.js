import { buildFormInput } from './_lib.js'
import { build } from './form-input.js'

export const css = ['waibuExtra.virtual:/tempusDominus/css/tempus-dominus.min.css']
export function scripts (req) {
  const items = [
    'waibuExtra.virtual:/popperjs/umd/popper.min.js',
    'waibuExtra.virtual:/tempusDominus/js/tempus-dominus.min.js'
  ]
  if (req.lang === 'id') items.push('waibuExtra.asset:/js/tempus-dominus-id.js')
  return items
}
export function inlineScript (req) {
  const { jsonStringify } = this.plugin.app.waibuMpa
  const opts = {
    display: {
      icons: {
        time: this.iconset.resolve('clock'),
        date: this.iconset.resolve('calendar'),
        up: this.iconset.resolve('caretUp'),
        down: this.iconset.resolve('caretDown'),
        previous: this.iconset.resolve('caretStart'),
        next: this.iconset.resolve('caretEnd'),
        close: this.iconset.resolve('remove'),
        clear: this.iconset.resolve('trash'),
        today: this.iconset.resolve('calendarCheck')
      },
      components: {
        seconds: true
      },
      theme: req.darkMode ? 'dark' : 'light'
    },
    localization: {
      format: 'L LTS'
    }
  }
  const items = [`const tdGlobalOpts = ${jsonStringify(opts, true)}`]
  if (req.lang === 'id') {
    items.unshift(
      'tempusDominus.loadLocale(tempusDominus.locales.id)',
      'tempusDominus.locale(tempusDominus.locales.id.name)'
    )
  }
  return items.join('\n')
}

export async function handler (opts, params = {}) {
  const { jsonStringify } = this.plugin.app.waibuMpa
  this.params.attr['x-ref'] = 'self'
  this.params.attr['x-data'] = `{
    instance: null,
    opts: ${jsonStringify(opts, true)}
  }`
  this.params.attr['@load.window'] = `
    const options = _.merge({}, tdGlobalOpts, opts ?? {})
    instance = new tempusDominus.TempusDominus($refs.self, options)
  `
  await build.call(this, buildFormInput, this.params)
}

async function formDatetime () {
  return class FormDatetime extends this.baseFactory {
    static css = [...super.css, ...css]
    static scripts = [...super.scripts, ...scripts(this.component.req)]
    static inlineScript = inlineScript(this.component.req)

    build = async () => {
      const { set } = this.app.lib._
      const opts = {}
      if (this.params.attr.sideBySide) set(opts, 'display.sideBySide', true)
      if (this.params.attr.calendarWeeks) set(opts, 'display.calendarWeeks', true)
      set(opts, 'display.buttons.today', true)
      set(opts, 'display.buttons.clear', true)
      if (this.params.attr.dateRange) set(opts, 'dateRange', true)
      await handler.call(this, opts, this.params)
    }
  }
}

export default formDatetime
