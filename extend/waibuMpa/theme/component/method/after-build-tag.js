import {
  levels, breakpoints, opacities, floats, peEvents, fits, overflows, vAligns
} from './after-build-tag/_lib.js'
import marginPadding from './after-build-tag/margin-padding.js'
import position from './after-build-tag/position.js'
import font from './after-build-tag/font.js'
import text from './after-build-tag/text.js'
import background from './after-build-tag/background.js'
import link from './after-build-tag/link.js'
import border from './after-build-tag/border.js'
import rounded from './after-build-tag/rounded.js'
import dim from './after-build-tag/dim.js'
import flex from './after-build-tag/flex.js'
import display from './after-build-tag/display.js'
import disabled from './after-build-tag/disabled.js'
import active from './after-build-tag/active.js'
import popover from './after-build-tag/popover.js'
import tooltip from './after-build-tag/tooltip.js'
import label from './after-build-tag/label.js'
import gutter from './after-build-tag/gutter.js'

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
  { key: 'pointerEvent', val: 'pe{value}', values: peEvents },
  { key: 'objectFit', val: 'object-fit{type}{value}', values: fits, types: breakpoints, tags: ['img', 'video', 'iframe', 'embed', 'audio', 'canvas', 'object'] },
  { key: 'opacity', val: 'opacity{value}', values: opacities },
  { key: 'overflow', val: 'overflow{type}{value}', types: ['x', 'y'], values: overflows },
  { key: 'shadow', val: 'shadow{value}', values: ['none', 'sm', 'lg', 'inset'], allowEmpty: true },
  { key: 'position', handler: position },
  { key: 'dim', handler: dim },
  { key: 'margin', handler: marginPadding },
  { key: 'padding', handler: marginPadding },
  { key: 'gutter', handler: gutter }
]

async function afterBuildTag (tag, params) {
  const { omit, isEmpty } = this.plugin.lib._
  let excluded = []
  params.attr = params.attr ?? {}
  tag = tag ?? params.tag
  if (tag === 'any') tag = params.tag

  for (const s of styles) {
    let { key, values = [], val, tags = [], types = [] } = s
    if (!val) val = key
    if (!params.attr[key]) continue
    if (tags.length > 0 && !tags.includes(tag)) {
      excluded.push(key)
      continue
    }
    if (s.handler) s.handler.call(this, { tag, key, params })
    else if (val.includes('{value}')) {
      if (s.allowEmpty || values.includes(params.attr[key])) {
        if (types.length > 0) {
          for (const v of types) {
            const k = `${key}-type`
            if (params.attr[k] === v) {
              val = val.replace('{type}', '-' + params.attr[k])
              excluded.push(k)
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
    excluded.push(key)
    for (const k in params.attr) {
      if (k.startsWith(key)) excluded.push(k)
    }
  }
  /*
  for (const key in params.attr) {
    for (const k of keys) {
      if (key.includes(k)) excluded.push(key)
    }
  }
  */
  if (!['btn'].includes(tag)) excluded = excluded.filter(item => !['disabled'].includes(item))
  params.attr = omit(params.attr, ['color', 'noDismiss', 'size', 'split', 'ordered',
    'dir', 'menu', 'divider', 'header', 'autoClose', 'offset', 'group', 'toggleAll',
    'showOnStart', 'autoPlay', 'fade', 'indicator', 'noNavigation', 'noTouch', 'alwaysOpen',
    'toggle', 'toggleAll', 'divider', 'header', 'menuOnly', 'menuTag', 'scroll', 'grid',
    'inline', 'reverse', 'datalist', 'unstyled', 'hover', 'horizontal', 'launch', 'icon',
    'noKeyboard', 'centered', 'noFade', 'expandable', 'fill', 'open', 'dismiss', 'iconEnd',
    'idLabel', 'side', 'col', 'break', 'order', 'gutter', 'dark', 'noBorder', 'noDivider',
    'tooltipPlacement', 'popoverPlacement', 'menuScroll', 'content', 'badge', 'noLabel',
    'description', 'wrapper', 'noWrapper', 'responsive', 'thumbnail', 'noLabel', 'ohref',
    ...excluded])
}

export default afterBuildTag
