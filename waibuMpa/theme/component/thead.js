const baseCls = 'table'

const tr = {
  selector: '.table thead',
  handler: async function ({ params }) {
    params.tag = 'thead'
    const attr = params.attr
    for (const item of ['variant']) {
      this._getAttr(attr, item, baseCls)
    }
  }
}

export default tr
