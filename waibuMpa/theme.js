async function theme (ctx) {
  const css = [
    'waibuBootstrap.virtual:/bootstrap/css/bootstrap.min.css',
    '$waibuBootstrap.asset:/css/wbs.css'
  ]
  const scripts = [
    'waibuBootstrap.virtual:/bootstrap/js/bootstrap.bundle.min.js',
    'bajo.virtual:/lodash/lodash.min.js',
    '$waibuBootstrap.asset:/js/wbs.js'
  ]
  const meta = [{
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
  }]
  return {
    name: 'bootstrap',
    css,
    scripts,
    meta,
    moveToEnd: '.offcanvas, .modal, script'
  }
}

export default theme
