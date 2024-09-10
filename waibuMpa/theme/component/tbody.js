const cls = 'table'

const tbody = {
  selector: `.${cls} tbody`,
  handler: async function (params = {}) {
    this._normalizeAttr(params)
    if (params.attr.divider) params.attr.class.push('group-divider')
  }
}

export default tbody
