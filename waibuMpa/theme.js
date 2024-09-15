async function theme (ctx) {
  const css = [
    'waibuBootstrap.virtual:/bootstrap/css/bootstrap.min.css',
    'waibuExtra.virtual:/highlightjs/styles/default.min.css'
  ]
  const scripts = [
    'waibuBootstrap.virtual:/bootstrap/js/bootstrap.bundle.min.js',
    'waibuExtra.virtual:/holderjs/holder.min.js',
    'waibuExtra.virtual:/masonry/masonry.pkgd.min.js',
    'waibuExtra.virtual:/highlightjs/highlight.min.js',
    'waibuBootstrap.asset:/js/init.js'
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
