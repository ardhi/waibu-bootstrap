import { buildFormInput } from './_lib.js'
import { build } from './form-input.js'

export const css = ['waibuExtra.virtual:/tempusDominus/css/tempus-dominus.min.css']
export function scripts (cls) {
  const { isFunction } = this.app.lib._
  const items = [
    'waibuExtra.virtual:/popperjs/umd/popper.min.js',
    'waibuExtra.virtual:/tempusDominus/js/tempus-dominus.min.js'
  ]
  if (this.req.lang === 'id') items.push('waibuExtra.asset:/js/tempus-dominus-id.js')
  else if (this.req.lang !== 'en-US') items.push(`waibuExtra.virtual:/tempusDominus/locales/${this.req.lang}.js`)

  if (isFunction(cls.scripts)) return items
  return [...cls.scripts ?? [], ...items]
}
export function inlineScript (cls) {
  const { jsonStringify } = this.plugin.app.waibuMpa
  const { isFunction } = this.app.lib._
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
      theme: this.req.darkMode ? 'dark' : 'light'
    },
    localization: {
      format: 'L LTS'
    }
  }
  let items = [
    `const tdGlobalOpts = ${jsonStringify(opts, true)}`
  ]
  if (this.req.lang !== 'en-US') {
    items.unshift(
      `tempusDominus.loadLocale(tempusDominus.locales.${this.req.lang})`,
      `tempusDominus.locale(tempusDominus.locales.${this.req.lang}.name)`
    )
  }
  items = items.join('\n')
  if (isFunction(cls.inlineScript)) return items
  return (cls.inlineScript ?? '') + '\n' + items
}

export async function handler (opts, params = {}) {
  const { jsonStringify } = this.app.waibuMpa
  const { generateId } = this.app.lib.aneka
  this.params.attr.id = generateId('alpha')
  this.params.attr['x-ref'] = 'self'
  this.params.attr['x-data'] = `{
    instance: null,
    opts: ${jsonStringify(opts, true)}
  }`
  this.params.attr['@load.window'] = `
    const options = _.merge({}, tdGlobalOpts, opts ?? {})
    instance = new tempusDominus.TempusDominus($refs.self, options)
    instance.subscribe(tempusDominus.Namespace.events.change, (e) => {
      if (e.type === 'change.td') {
        $dispatch('input', instance.dates.lastPicked.toISOString())
      }
    })
  `
  await build.call(this, buildFormInput, this.params)
}

async function formDatetime () {
  return class FormDatetime extends this.app.baseClass.MpaWidget {
    static css = [...super.css, ...css]
    static scripts = scripts
    static inlineScript = inlineScript

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
