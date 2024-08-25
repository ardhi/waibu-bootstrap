const levels = ['1', '2', '3', '4', '5', '6']
const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']
const weights = ['bold', 'bolder', 'semibold', 'medium', 'normal', 'light', 'lighter']
const fstyles = ['italic', 'normal']
const heights = ['1', 'sm', 'base', 'lg']
const cvariants = ['emphasis', 'secondary', 'tertiary']
const cbgvariants = ['subtle', 'secondary', 'tertiary']
const opacities = ['25', '50', '75']
const positions = ['top', 'bottom', 'start', 'end']
const sizes = ['1', '2', '3', '4', '5']
const displays = ['none', 'inline', 'inline-block', 'block', 'grid', 'inline-grid',
  'table', 'table-cell', 'table-row', 'flex', 'inline-flex']
const flexes = ['row', 'column', 'row-reverse', 'column-reverse', 'fill', 'shrink', 'grow', 'nowrap', 'wrap', 'wrap-reverse']
const justifyContents = ['start', 'end', 'center', 'between', 'around', 'evenly']
const alignItems = ['start', 'end', 'center', 'baseline', 'stretch']
const floats = ['float-start', 'float-end', 'float-none']
const peEvents = ['all', 'auto', 'none']
const fits = ['contain', 'cover', 'fill', 'scale', 'none']

const styles = [
  { key: 'mark' },
  { key: 'small' },
  { key: 'text-start' },
  { key: 'text-center' },
  { key: 'text-break' },
  { key: 'text-reset' },
  { key: 'underline', val: 'text-decoration-underline' },
  { key: 'line-through', val: 'text-decoration-line-through' },
  { key: 'lowercase', val: 'text-lowercase' },
  { key: 'uppercase', val: 'text-uppercase' },
  { key: 'no-decoration', val: 'text-decoration-none' },
  { key: 'wrap', val: 'text-wrap' },
  { key: 'no-wrap', val: 'text-nowrap' },
  { key: 'monospace', val: 'font-monospace' },
  { key: 'font-size', val: 'fs-{value}', values: levels },
  { key: 'font-weight', val: 'fw-{value}', values: weights },
  { key: 'font-style', val: 'fst-{value}', values: fstyles },
  { key: 'line-height', val: 'lh-{value}', values: heights },
  { key: 'heading', val: 'h-{value}', values: levels, forceTag: ['p'] },
  { key: 'heading-display', val: 'display-{value}', values: levels, forceTag: 'h1' },
  { key: 'text-end', val: 'text-{value}-end', values: breakpoints, allowEmpty: true },
  { key: 'text-color', val: 'text-{value}', values: [], variants: cvariants },
  { key: 'text-opacity', val: 'text-{value}', values: opacities },
  { key: 'bg', val: 'bg-{value}', values: [], variants: ['50', ...cbgvariants] },
  { key: 'bg-opacity', val: 'bg-{value}', values: opacities },
  { key: 'gradient', val: 'bg-gradient' },
  { key: 'border', val: 'border-{value}', values: positions, allowEmpty: true },
  { key: 'border-color', val: 'border-{value}', values: [], variants: ['50', ...cbgvariants] },
  { key: 'border-opacity', val: 'border-{value}', values: opacities },
  { key: 'border-size', val: 'border-{value}', values: sizes },
  { key: 'rounded', val: 'rounded-{value}', values: ['circle', 'pill', ...positions], allowEmpty: true, variants: ['0', ...sizes] },
  { key: 'rounded-size', val: 'rounded-{value}', values: ['0', ...sizes] },
  { key: 'display', val: 'd-{value}', values: displays, breakpoints },
  { key: 'flex', val: 'flex-{value}', values: flexes, breakpoints, variant: ['0', '1'] },
  { key: 'justify-content', val: 'justify-content-{value}', values: justifyContents, breakpoints },
  { key: 'align-items', val: 'align-items-{value}', values: alignItems, breakpoints },
  { key: 'align-self', val: 'align-self-{value}', values: alignItems, breakpoints },
  { key: 'align-content', val: 'align-content-{value}', values: justifyContents, breakpoints },
  { key: 'order', val: 'order-{value}', values: ['0', 'first', 'last', ...sizes], breakpoints },
  { key: 'float', val: 'float-{value}', values: floats, breakpoints },
  { key: 'user-select', val: 'user-select-{value}', values: ['all', ...peEvents] },
  { key: 'pointer-event', val: 'pointer-event-{value}', values: peEvents },
  { key: 'link', val: 'link-{value}', values: [] },
  { key: 'link-opacity', val: 'link-opacity-{value}', values: opacities, variant: ['hover'] },
  { key: 'link-underline', val: 'link-underline-{value}', values: [] },
  { key: 'link-underline-opacity', val: 'link-underline-opacity-{value}', values: opacities, variant: ['hover'] },
  { key: 'object-fit', val: 'object-fit-{value}', values: fits, breakpoints, tags: ['img', 'video'] }
]

async function _afterBuildTag (tag, { params, reply, el, locals }) {
  const { has, omit, cloneDeep, findIndex, map } = this._
  const colors = cloneDeep(this.getAttrValues.variant)
  colors.push('body', 'black', 'white')
  for (const key of ['text-color', 'bg', 'border-color', 'link-underline', 'link']) {
    const idx = findIndex(styles, { key })
    styles[idx].values = colors
  }
  const keys = map(styles, 'key')
  const omitted = []
  tag = tag ?? params.tag
  if (tag === 'any') tag = params.tag
  for (const s of styles) {
    let { key, values = [], variants = [], val, tags = [], breakpoints = [] } = s
    if (!val) val = key
    if (!has(params.attr, key)) continue
    if (tags.length > 0 && !tags.includes(tag)) {
      omitted.push(key)
      continue
    }
    if (val.includes('{value}')) {
      if (values.includes(params.attr[key])) {
        if (breakpoints.length > 0) {
          for (const v of breakpoints) {
            const k = `${key}-breakpoint`
            if (params.attr[k] === v) {
              val = val.replace('{value}', params.attr[k] + '-{value}')
              omitted.push(k)
            }
          }
        }
        val = val.replace('{value}', params.attr[key])
        if (variants.length > 0) {
          for (const v of variants) {
            const k = `${key}-variant`
            if (params.attr[k] === v) {
              val += `-${v}`
              omitted.push(k)
            }
          }
        }
        params.attr.class.push(val)
      } else if (s.allowEmpty) params.attr.class.push(key)
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
