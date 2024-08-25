const baseClass = 'table'

const th = {
  selector: `.${baseClass} th`,
  handler: async function ({ params }) {
    params.baseClass = baseClass
    params.ezAttrs = ['variant', 'v-align', 'active']
  }
}

export default th
