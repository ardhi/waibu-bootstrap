const cls = 'progress-stacked'

const progressStack = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { pick } = this.plugin.app.bajo.lib._
    const $ = this.$
    this._normalizeAttr(params, { tag: 'div', cls })
    params.html = $(`<div>${params.html}</div>`).children().each(function () {
      let style = {}
      $(this).children().each(function () {
        style = pick($(this).prop('style'), ['width'])
        $(this).removeAttr('style')
      })
      $(this).prop('style', `width: ${style.width};`)
    }).parent().html()
  }
}

export default progressStack
