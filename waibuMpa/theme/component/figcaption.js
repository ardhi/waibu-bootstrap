const cls = 'figure-caption'

const figcaption = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { cls })
  }
}

export default figcaption
