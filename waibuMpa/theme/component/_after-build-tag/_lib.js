export const levels = ['1', '2', '3', '4', '5', '6']
export const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl']
export const weights = ['bold', 'bolder', 'semibold', 'medium', 'normal', 'light', 'lighter']
export const fstyles = ['italic', 'normal']
export const heights = ['1', 'sm', 'base', 'lg']
export const cvariants = ['emphasis', 'secondary', 'tertiary']
export const cbgvariants = ['subtle', 'secondary', 'tertiary']
export const opacities = ['25', '50', '75', '100']
export const directions = ['top', 'bottom', 'start', 'end']
export const widths = ['1', '2', '3', '4', '5']
export const dims = ['25', '50', '75', '100', 'auto']
export const sizes = ['sm', 'lg']
export const displays = ['none', 'inline', 'inline-block', 'block', 'grid', 'inline-grid',
  'table', 'table-cell', 'table-row']
export const flexes = ['row', 'column', 'row-reverse', 'column-reverse', 'fill', 'shrink', 'grow', 'nowrap', 'wrap', 'wrap-reverse']
export const justifyContents = ['start', 'end', 'center', 'between', 'around', 'evenly']
export const alignItems = ['start', 'end', 'center', 'baseline', 'stretch']
export const floats = ['float-start', 'float-end', 'float-none']
export const peEvents = ['all', 'auto', 'none']
export const fits = ['contain', 'cover', 'fill', 'scale', 'none']
export const overflows = ['auto', 'hidden', 'visible', 'scroll']
export const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky']
export const sides = ['x', 'y', 'all', ...directions]
export const poses = ['0', '50', '100']
export const vAligns = ['baseline', 'top', 'middle', 'bottom', 'text-bottom', 'text-top']

export function parseVariant ({ cls, value, values = [], variants = [], prepend } = {}) {
  const [core, variant] = value.split('-')
  const items = []
  if (values.includes(core)) {
    items.push(cls, core)
    if (variants.includes(variant)) prepend ? items.splice(1, 0, variant) : items.push(variant)
  }
  return items.join('-')
}

export function parseSimple ({ cls, value, values = [] } = {}) {
  if (values.includes(value)) return `${cls}-${value}`
  return ''
}
