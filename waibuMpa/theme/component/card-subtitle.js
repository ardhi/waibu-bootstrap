const cls = 'card-subtitle'

const cardSubtitle = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    this._normalizeAttr(params, { tag: 'h6', cls: [cls, 'mb-2', 'text-body-secondary'] })
  }
}

export default cardSubtitle
