const lead = {
  selector: '.lead',
  handler: async function ({ params, reply } = {}) {
    params.tag = params.attr.tag ?? 'p'
    params.attr.class.push('lead')
  }
}

export default lead
