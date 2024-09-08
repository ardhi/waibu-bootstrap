const cls = 'table'

const tbody = {
  selector: `.${cls} tbody`,
  handler: async function (params = {}) {
    if (params.attr.divider) params.attr.class.push('group-divider')
  }
}

export default tbody
