const baseCls = 'table'

const tr = {
  selector: '.table tr',
  handler: async function ({ params }) {
    params.tag = 'tr'
    const attr = params.attr
    for (const item of ['variant', 'v-align']) {
      this._getAttr(attr, item, baseCls)
    }
    for (const item of ['active']) {
      this._hasAttr(attr, item, baseCls)
    }
  }
}

export default tr
