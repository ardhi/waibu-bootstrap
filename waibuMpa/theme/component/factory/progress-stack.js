const cls = 'progress-stacked'

async function progressStack (component) {
  return class ProgressStack extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }

    async build () {
      const { pick } = this.plugin.app.bajo.lib._
      const { $ } = this.component
      this.params.html = $(`<div>${this.params.html}</div>`).children().each(function () {
        let style = {}
        $(this).children().each(function () {
          style = pick($(this).prop('style'), ['width'])
          $(this).removeAttr('style')
        })
        $(this).prop('style', `width: ${style.width};`)
      }).parent().html()
    }
  }
}

export default progressStack
