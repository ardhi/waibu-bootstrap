const cls = 'figure-caption'

const figcaption = {
  selector: '.' + cls,
  handler: async function ({ params, reply } = {}) {
    params.attr.class.push(cls)
  }
}

export default figcaption
