const baseClass = 'figure-caption'

const figcaption = {
  selector: baseClass,
  handler: async function img ({ params, reply } = {}) {
    params.attr.class.push(baseClass)
    params.baseClass = baseClass
    params.ezAttrs = ['t-align']
  }
}

export default figcaption
