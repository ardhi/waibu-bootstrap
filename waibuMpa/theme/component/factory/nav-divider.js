const cls = 'nav-item'

async function navDivider () {
  return class NavDivider extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
      this.component.normalizeAttr(this.params, { tag: 'li', cls })
    }

    build = async () => {
      this.params.attr.padding = 'y-2'
      const attr = {
        class: ['vr'],
        display: 'type:none type:flex-lg',
        dim: 'height:100',
        margin: this.params.attr.margin ?? 'x-2'
      }
      this.params.html = await this.component.buildTag({ tag: 'div', attr })
    }
  }
}

export default navDivider
