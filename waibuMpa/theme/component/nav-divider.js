const cls = 'nav-item'

const navDivider = {
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'li', cls })
    params.attr.padding = 'y-2'
    const attr = {
      class: ['vr'],
      display: 'type:none type:flex-lg',
      dim: 'height:100',
      text: 'color:white',
      margin: 'x-2'
    }
    params.html = await this.buildTag({ tag: 'div', attr })
  }
}

export default navDivider
