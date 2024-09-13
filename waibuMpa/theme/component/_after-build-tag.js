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
import disabled from './_after-build-tag/disabled.js'
import active from './_after-build-tag/active.js'
import popover from './_after-build-tag/popover.js'
import tooltip from './_after-build-tag/tooltip.js'
import label from './_after-build-tag/label.js'

const styles = [
  { key: 'visible' },
  { key: 'invisible' },
  { key: 'clear', val: 'clearfix' },
  { key: 'label', handler: label },
  { key: 'popover', handler: popover },
  { key: 'tooltip', handler: tooltip },
  { key: 'active', handler: active },
  { key: 'disabled', handler: disabled },
  { key: 'text', handler: text },
  { key: 'font', handler: font },
  { key: 'link', handler: link },
  { key: 'border', handler: border },
  { key: 'rounded', handler: rounded },
  { key: 'heading', val: 'h{value}', values: levels, forceTag: ['p'] },
  { key: 'headingDisplay', val: 'display{value}', values: levels, forceTag: 'h1' },
  { key: 'background', handler: background },
  { key: 'display', handler: display },
  { key: 'flex', handler: flex },
  { key: 'vAlign', val: 'align{value}', values: vAligns },
  { key: 'float', val: 'float{type}{value}', values: floats, types: breakpoints },
  { key: 'userSelect', val: 'user-select{value}', values: ['all', ...peEvents] },
  { key: 'pointerEvent', val: 'pointer-event{value}', values: peEvents },
  { key: 'objectFit', val: 'object-fit{type}{value}', values: fits, types: breakpoints, tags: ['img', 'video', 'iframe', 'embed', 'audio', 'canvas', 'object'] },
  { key: 'opacity', val: 'opacity{value}', values: opacities },
  { key: 'overflow', val: 'overflow{type}{value}', types: ['x', 'y'], values: overflows },
  { key: 'shadow', val: 'shadow{value}', values: ['none', 'sm', 'lg', 'inset'], allowEmpty: true },
  { key: 'position', handler: position },
  { key: 'dim', handler: dim },
  { key: 'margin', handler: marginPadding },
  { key: 'padding', handler: marginPadding }
]

async function _afterBuildTag (tag, params) {
  const { omit, map, isEmpty } = this.plugin.app.bajo.lib._
  const keys = map(styles, 'key')
  const omitted = []
  params.attr = params.attr ?? {}
  tag = tag ?? params.tag
  if (tag === 'any') tag = params.tag

  for (const s of styles) {
    let { key, values = [], val, tags = [], types = [] } = s
    if (!val) val = key
    if (!params.attr[key]) continue
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
        params.attr.class.push(val.replace('{value}', '').replace('{type}', ''))
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
  params.attr = omit(params.attr, ['color', 'noDismiss', 'size', 'split', 'ordered',
    'dir', 'menu', 'divider', 'header', 'autoClose', 'offset', 'group', 'toggleAll',
    'showOnStart', 'autoPlay', 'fade', 'indicator', 'navigation', 'noTouch', 'alwaysOpen',
    'toggle', 'toggleAll', 'divider', 'header', 'menuOnly', 'menuTag', 'scrollable',
    'inline', 'reverse', 'datalist', 'inline', 'actionable', 'horizontal', 'trigger',
    'noKeyboard', 'centered', 'noFade', 'expandable', 'fill', 'open', 'close',
    'idLabel', 'side', 'col', 'break', 'order', 'gutter', 'dark',
    ...omitted])
}

export default _afterBuildTag
