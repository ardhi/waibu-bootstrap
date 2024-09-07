const baseClass = 'table'

const tr = {
  selector: `.${baseClass} tr`,
  handler: async function (params = {}) {
    params.baseClass = baseClass
    params.ezAttrs = ['variant', 'v-align', 'active']
  }
}

export default tr
