const baseClass = 'figure'

const figure = {
  selector: baseClass,
  handler: async function img ({ params, reply } = {}) {
    params.attr.class.push(baseClass)
    params.baseClass = baseClass
    await this.buildChildTag('img-src', { params, reply })
    await this.buildChildTag('caption', { tag: 'figcaption', params, reply, inner: true })
  }
}

export default figure
