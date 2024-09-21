const cls = 'table'

const thead = {
  selector: `.${cls} thead`,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.divider) params.attr.class.push(`${cls}-group-divider`)
  }
}

export default thead
