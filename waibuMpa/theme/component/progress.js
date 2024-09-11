const cls = 'progress'

const progress = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    const { omit, isString } = this.plugin.app.bajo.lib._
    const { numUnit } = this.plugin.app.bajo
    const min = Number(params.attr.min) || 0
    const max = Number(params.attr.max) || 100
    const value = Number(params.attr.value) || 0
    this._normalizeAttr(params, { tag: 'div', cls, role: 'progressbar', ariaValuenow: value, ariaValuemin: min, ariaValuemax: max })
    if (isString(params.attr.height)) params.attr.style = { height: numUnit(params.attr.height, 'px') }
    let html = ''
    if (isString(params.attr.label)) html = params.req.t(params.attr.label, value)
    else if (params.attr.label === true) html = `${value}%`
    const attr = {
      text: params.attr.text,
      class: ['progress-bar'],
      background: params.attr.background,
      style: { width: `${value}%` }
    }
    if (params.attr.strip) {
      attr.class.push('progress-bar-striped')
      if (params.attr.strip === 'animated') attr.class.push('progress-bar-animated')
    }
    params.html = await this.buildTag({ tag: 'div', attr, html })
    params.attr = omit(params.attr, ['min', 'max', 'background', 'height', 'text', 'strip', 'animated'])
  }
}

export default progress
