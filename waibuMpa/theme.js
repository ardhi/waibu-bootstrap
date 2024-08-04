async function afterBuildPage ({ $, reply } = {}) {
  if (reply.request.darkMode) $('html').attr('data-bs-theme', 'dark')
}

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
  return {
    name: 'bootstrap',
    css,
    scripts,
    meta,
    afterBuildPage
  }
}

export default theme
