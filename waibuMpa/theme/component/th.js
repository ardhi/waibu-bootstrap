const baseClass = 'table'

const th = {
  selector: `.${baseClass} th`,
  handler: async function (params = {}) {
    params.baseClass = baseClass
    params.ezAttrs = ['color', 'v-align', 'active']
  }
}

export default th
