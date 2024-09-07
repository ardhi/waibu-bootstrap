const baseClass = 'table'

const tbody = {
  selector: `.${baseClass} tbody`,
  handler: async function (params = {}) {
    params.baseClass = baseClass
    params.ezAttrs = [{ key: 'divider', value: 'group-divider' }]
  }
}

export default tbody
