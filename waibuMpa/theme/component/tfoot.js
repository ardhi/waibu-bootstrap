const baseClass = 'table'

const tfoot = {
  selector: `.${baseClass} tfoot`,
  handler: async function ({ params }) {
    params.baseClass = baseClass
    params.ezAttrs = ['variant']
  }
}

export default tfoot
