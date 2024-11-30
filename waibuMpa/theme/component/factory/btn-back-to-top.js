async function btnBackToTop (component) {
  return class BtnBackToTop extends component.baseFactory {
    constructor (options) {
      super(options)
      this.params.noTag = true
      this.params.attr.icon = this.params.attr.icon ?? 'arrowUp'
      this.params.attr.color = this.params.attr.color ?? 'primary'
      this.params.attr.revealAt = this.params.attr.revealAt ?? '20'
      this.params.attr.style = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none'
      }
    }

    async build () {
      this.params.attr['x-data'] = `{
        scroll () {
          if (document.body.scrollTop > ${this.params.attr.revealAt} || document.documentElement.scrollTop > ${this.params.attr.revealAt}) {
            this.$refs.btn.style.display = 'block'
          } else {
            this.$refs.btn.style.display = 'none'
          }
        },
        toTop () {
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        }
      }`
      this.params.attr['@scroll.window'] = 'scroll()'
      this.params.attr['x-ref'] = 'btn'
      this.params.attr['@click'] = 'toTop()'
      delete this.params.attr.revealAt
      this.params.html = await this.component.buildTag({ tag: 'btn', attr: this.params.attr })
    }
  }
}

export default btnBackToTop
