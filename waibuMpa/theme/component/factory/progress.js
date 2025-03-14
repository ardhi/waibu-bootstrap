const cls = 'progress'

async function progress () {
  return class Progress extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    build = async () => {
      const { omit, isString } = this.plugin.lib._
      const { numUnit } = this.plugin.app.bajo
      const min = Number(this.params.attr.min) || 0
      const max = Number(this.params.attr.max) || 100
      const value = Number(this.params.attr.value) || 0
      this.component.normalizeAttr(this.params, { tag: 'div', cls, role: 'progressbar', ariaValuenow: value, ariaValuemin: min, ariaValuemax: max })
      if (isString(this.params.attr.height)) this.params.attr.style = { height: numUnit(this.params.attr.height, 'px') }
      let html = ''
      if (isString(this.params.attr.label)) html = this.component.req.t(this.params.attr.label, value)
      else if (this.params.attr.label === true) html = `${value}%`
      const attr = {
        text: this.params.attr.text,
        class: ['progress-bar'],
        background: this.params.attr.background,
        style: { width: `${value}%` }
      }
      if (this.params.attr.strip) {
        attr.class.push('progress-bar-striped')
        if (this.params.attr.strip === 'animated') attr.class.push('progress-bar-animated')
      }
      this.params.html = await this.component.buildTag({ tag: 'div', attr, html })
      this.params.attr = omit(this.params.attr, ['min', 'max', 'background', 'height', 'text', 'strip', 'animated'])
    }
  }
}

export default progress
