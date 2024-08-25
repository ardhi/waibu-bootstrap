const baseClass = 'table'

const td = {
  selector: `.${baseClass} td`,
  handler: async function ({ params }) {
    params.baseClass = baseClass
    params.ezAttrs = ['variant', 'v-align', 'active']
  }
}

export default td
