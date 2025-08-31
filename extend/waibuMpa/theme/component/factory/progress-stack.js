const cls = 'progress-stacked'

async function progressStack () {
  return class ProgressStack extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'div', cls })
    }

    build = async () => {
      const { pick } = this.app.lib._
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
