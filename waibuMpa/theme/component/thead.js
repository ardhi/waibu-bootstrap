const baseClass = 'table'

const thead = {
  selector: `.${baseClass} thead`,
  handler: async function ({ params }) {
    params.baseClass = baseClass
    params.ezAttrs = ['color']
  }
}

export default thead
