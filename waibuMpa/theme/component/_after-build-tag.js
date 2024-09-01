import {
  levels, breakpoints, opacities, floats, peEvents, fits, overflows, vAligns
} from './_after-build-tag/_lib.js'
import marginPadding from './_after-build-tag/margin-padding.js'
import position from './_after-build-tag/position.js'
import font from './_after-build-tag/font.js'
import text from './_after-build-tag/text.js'
import background from './_after-build-tag/background.js'
import link from './_after-build-tag/link.js'
import border from './_after-build-tag/border.js'
import rounded from './_after-build-tag/rounded.js'
import dim from './_after-build-tag/dim.js'
import flex from './_after-build-tag/flex.js'
import display from './_after-build-tag/display.js'

const styles = [
  { key: 'visible' },
  { key: 'invisible' },
  { key: 'text', handler: text },
  { key: 'font', handler: font },
  { key: 'link', handler: link },
  { key: 'border', handler: border },
  { key: 'rounded', handler: rounded },
  { key: 'heading', val: 'h{value}', values: levels, forceTag: ['p'] },
  { key: 'heading-display', val: 'display{value}', values: levels, forceTag: 'h1' },
  { key: 'background', handler: background },
  { key: 'display', handler: display },
  { key: 'flex', handler: flex },
  { key: 'v-align', val: 'alugn{value}', values: vAligns },
  { key: 'float', val: 'float{type}{value}', values: floats, types: breakpoints },
  { key: 'user-select', val: 'user-select{value}', values: ['all', ...peEvents] },
  { key: 'pointer-event', val: 'pointer-event{value}', values: peEvents },
  { key: 'object-fit', val: 'object-fit{type}{value}', values: fits, types: breakpoints, tags: ['img', 'video', 'iframe', 'embed', 'audio', 'canvas', 'object'] },
  { key: 'opacity', val: 'opacity{value}', values: opacities },
  { key: 'overflow', val: 'overflow{type}{value}', types: ['x', 'y'], values: overflows },
  { key: 'shadow', val: 'shadow{value}', values: ['none', 'sm', 'lg', 'inset'], allowEmpty: true },
  { key: 'position', handler: position },
  { key: 'dim', handler: dim },
  { key: 'margin', handler: marginPadding },
  { key: 'padding', handler: marginPadding }
]

async function _afterBuildTag (tag, { params, reply, el, locals }) {
  const { has, omit, map, isEmpty } = this._
  const keys = map(styles, 'key')
  const omitted = []
  tag = tag ?? params.tag
  if (tag === 'any') tag = params.tag
  for (const s of styles) {
    let { key, values = [], val, tags = [], types = [] } = s
    if (!val) val = key
    if (!has(params.attr, key)) continue
    if (tags.length > 0 && !tags.includes(tag)) {
      omitted.push(key)
      continue
    }
    if (s.handler) s.handler.call(this, { key, params })
    else if (val.includes('{value}')) {
      if (s.allowEmpty || values.includes(params.attr[key])) {
        if (types.length > 0) {
          for (const v of types) {
            const k = `${key}-type`
            if (params.attr[k] === v) {
              val = val.replace('{type}', '-' + params.attr[k])
              omitted.push(k)
            }
          }
        }
        if (isEmpty(params.attr[key])) val = val.replace('{value}', '')
        else if (values.includes(params.attr[key])) val = val.replace('{value}', '-' + params.attr[key])
        else val = ''
        params.attr.class.push(val.replace('{value}', '').replace('{type}', '').replace('{variant}', ''))
      }
    } else params.attr.class.push(val)
    if (s.forceTag) params.tag = s.forceTag
    omitted.push(key)
    for (const k in params.attr) {
      if (k.startsWith(key)) omitted.push(k)
    }
  }
  for (const key in params.attr) {
    for (const k of keys) {
      if (key.includes(k)) omitted.push(key)
    }
  }
  params.attr = omit(params.attr, omitted)
}

export default _afterBuildTag