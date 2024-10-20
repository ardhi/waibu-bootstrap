async function btnBackToTop (params = {}) {
  params.noTag = true
  params.attr.icon = params.attr.icon ?? 'arrowUp'
  params.attr.color = params.attr.color ?? 'primary'
  params.attr.revealAt = params.attr.revealAt ?? '20'
  params.attr.style = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    display: 'none'
  }
  params.attr['x-data'] = `{
    scroll () {
      if (document.body.scrollTop > ${params.attr.revealAt} || document.documentElement.scrollTop > ${params.attr.revealAt}) {
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
  params.attr['@scroll.window'] = 'scroll()'
  params.attr['x-ref'] = 'btn'
  params.attr['@click'] = 'toTop()'
  delete params.attr.revealAt
  params.html = await this.buildTag({ tag: 'btn', attr: params.attr })
}

export default btnBackToTop
