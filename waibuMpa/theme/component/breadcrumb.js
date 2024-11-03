const cls = 'breadcrumb'

function bcHandler (href, source, opts = {}) {
  const { last } = this.plugin.app.bajo.lib._
  const { titleize } = this.plugin.app.bajo
  const parts = href.split('/')
  const content = titleize(last(parts))
  if (href === source) return { content }
  return { content, href, hrefRebuild: opts.hrefRebuild }
}

async function generateItems (breadcrumb) {
  const html = []
  for (const b of breadcrumb) {
    let href = ''
    if (b.href) {
      href = 'href="' + b.href + '"'
      if (b.hrefRebuild) {
        href += ' href-rebuild="' + b.hrefRebuild.join(' ') + '"'
      }
    }
    const icon = b.icon ? (' icon="' + b.icon + '"') : ''
    const title = b.href && b.hrefRebuild && !this.locals._meta.params.model ? this.locals.page.title : b.content
    const content = b.content ? (' t:content="' + title + '"') : ''
    const active = b.href ? ' active' : ''
    html.push(`<c:breadcrumb-item ${icon} ${href} ${content} ${active} />`)
  }
  return await this.buildSentence(html.join('\n'))
}

const breadcrumb = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { isString, omit } = this.plugin.app.bajo.lib._
    const { routePath } = this.plugin.app.waibu
    const { urlToBreadcrumb, attrToArray } = this.plugin.app.waibuMpa
    this._normalizeAttr(params, { tag: 'ol', cls })
    let divider = ''
    if (params.attr.noDivider) divider = ' style="--bs-breadcrumb-divider: \'\';"'
    else if (isString(params.attr.divider)) divider = ` style="--bs-breadcrumb-divider: '${params.attr.divider}';"`
    params.prepend = `<nav aria-label="breadcrumb"${divider}>`
    params.append = '</nav>'
    if (params.attr.autoFill && this.locals.breadcrumb) {
      params.html = await generateItems.call(this, this.locals.breadcrumb)
    } else if (params.attr.autoDetect) {
      const url = isString(params.attr.autoDetect) ? params.attr.autoDetect : this.locals._meta.url
      const handlerOpts = {}
      if (params.attr.hrefRebuild === true) params.attr.hrefRebuild = 'list id mode'
      if (isString(params.attr.hrefRebuild)) handlerOpts.hrefRebuild = attrToArray(params.attr.hrefRebuild)
      const breadcrumb = urlToBreadcrumb(routePath(url), { handler: bcHandler, handlerScope: this, handlerOpts })
      if (!params.attr.noHome) breadcrumb.unshift({ icon: 'house', href: '/' })
      params.html = await generateItems.call(this, breadcrumb)
    }
    params.attr = omit(params.attr, ['divider', 'autoFill', 'autoDetect', 'autoDetectHome', 'hrefRebuild'])
  }
}

export default breadcrumb
