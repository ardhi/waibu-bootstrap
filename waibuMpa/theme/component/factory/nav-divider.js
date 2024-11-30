const cls = 'nav-item'

async function navDivider (component) {
  return class NavDivider extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'li', cls })
    }

    async build () {
      this.params.attr.padding = 'y-2'
      const attr = {
        class: ['vr'],
        display: 'type:none type:flex-lg',
        dim: 'height:100',
        margin: 'x-2'
      }
      this.params.html = await this.component.buildTag({ tag: 'div', attr })
    }
  }
}

export default navDivider
