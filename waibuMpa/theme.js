async function theme (ctx) {
  const css = [
    'waibuBootstrap.virtual:/bootstrap/css/bootstrap.min.css',
    '$waibuBootstrap.asset:/css/extra.css'
  ]
  const scripts = [
    'waibuBootstrap.virtual:/bootstrap/js/bootstrap.bundle.min.js',
    'waibuExtra.virtual:/masonry/masonry.pkgd.min.js',
    '$waibuBootstrap.asset:/js/extra.js'
  ]
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
