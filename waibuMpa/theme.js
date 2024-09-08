async function theme (ctx) {
  const css = [
    'waibuBootstrap.virtual:/bootstrap/css/bootstrap.min.css'
  ]
  const scripts = [
    'waibuBootstrap.virtual:/bootstrap/js/bootstrap.bundle.min.js'
  ]
  if (this.app.waibuExtra) scripts.push('waibuExtra.virtual:/holderjs/holder.min.js')
  const meta = [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  }]
  return {
    name: 'bootstrap',
    css,
    scripts,
    meta
  }
}

export default theme
