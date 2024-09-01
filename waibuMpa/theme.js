async function theme (ctx) {
  const css = [
    'waibuBootstrap.virtual:/bootstrap/css/bootstrap.min.css'
  ]
  const scripts = [
    'waibuBootstrap.virtual:/bootstrap/js/bootstrap.bundle.min.js'
  ]
  const meta = [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  }]
  const hasAttrValues = ['active', 'hover']
  const getAttrValues = {
    color: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'link'],
    size: ['sm', 'md', 'lg'],
    'v-align': {
      prefix: 'align',
      values: ['top', 'middle', 'bottom']
    },
    'h-align': {
      prefix: 'float',
      values: ['start', 'end']
    },
    't-align': {
      prefix: 'text',
      values: ['start', 'end']
    }
  }
  return {
    name: 'bootstrap',
    css,
    scripts,
    component: { hasAttrValues, getAttrValues },
    meta
  }
}

export default theme
