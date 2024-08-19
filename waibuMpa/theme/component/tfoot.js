const baseCls = 'table'

const tr = {
  selector: '.table tfoot',
  handler: async function ({ params }) {
    params.tag = 'tfoot'
    const attr = params.attr
    for (const item of ['variant']) {
      this._getAttr(attr, item, baseCls)
    }
  }
}

export default tr
