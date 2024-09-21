const cls = 'table'

const tfoot = {
  selector: `.${cls} tfoot`,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.divider) params.attr.class.push(`${cls}-group-divider`)
  }
}

export default tfoot
