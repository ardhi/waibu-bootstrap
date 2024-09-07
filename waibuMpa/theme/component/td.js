const baseClass = 'table'

const td = {
  selector: `.${baseClass} td`,
  handler: async function (params = {}) {
    params.baseClass = baseClass
    params.ezAttrs = ['color', 'v-align', 'active']
  }
}

export default td
