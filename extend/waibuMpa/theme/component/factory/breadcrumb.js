const cls = 'breadcrumb'

function bcHandler (href, source, opts = {}) {
  const { last, camelCase } = this.app.lib._
  const parts = href.split('/')
  const content = this.component.req.t(camelCase(last(parts)))
  if (href === source) return { content }
  return { content, href, hrefRebuild: opts.hrefRebuild }
}

async function generateItems (breadcrumb) {
  const { get } = this.app.lib._
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
    const title = b.href && b.hrefRebuild && !get(this, 'component.locals._meta.params.model') ? this.component.locals.page.title : b.content
    const content = b.content ? (' t:content="' + title + '"') : ''
    const active = b.href ? ' active' : ''
    html.push(`<c:breadcrumb-item ${icon} ${href} ${content} ${active} />`)
  }
  return await this.component.buildSentence(html.join('\n'))
}

async function breadcrumb () {
  return class Breadcrumb extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'ol', cls })
    }

    build = async () => {
      const { isString, omit } = this.app.lib._
      const { routePath } = this.app.waibu
      const { urlToBreadcrumb, attrToArray } = this.app.waibuMpa
      let divider = ''
      if (this.params.attr.noDivider) divider = ' style="--bs-breadcrumb-divider: \'\';"'
      else if (isString(this.params.attr.divider)) divider = ` style="--bs-breadcrumb-divider: '${this.params.attr.divider}';"`
      this.params.prepend = `<nav aria-label="breadcrumb"${divider}>`
      this.params.append = '</nav>'
      if (this.params.attr.autoFill && this.component.locals.breadcrumb) {
        this.params.html = await generateItems.call(this, this.component.locals.breadcrumb)
      } else if (this.params.attr.autoDetect) {
        const url = isString(this.params.attr.autoDetect) ? this.params.attr.autoDetect : this.component.locals._meta.url
        const handlerOpts = {}
        if (this.params.attr.hrefRebuild === true) this.params.attr.hrefRebuild = 'list id mode'
        if (isString(this.params.attr.hrefRebuild)) handlerOpts.hrefRebuild = attrToArray(this.params.attr.hrefRebuild)
        const breadcrumb = urlToBreadcrumb(routePath(url), { handler: bcHandler, handlerScope: this, handlerOpts })
        if (!this.params.attr.noHome) breadcrumb.unshift({ icon: 'house', href: '/' })
        this.params.html = await generateItems.call(this, breadcrumb)
      }
      this.params.attr = omit(this.params.attr, ['divider', 'autoFill', 'autoDetect', 'autoDetectHome', 'hrefRebuild'])
    }
  }
}

export default breadcrumb
