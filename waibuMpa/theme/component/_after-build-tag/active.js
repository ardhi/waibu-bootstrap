function active ({ key, params }) {
  params.attr.class.push(key)
  params.attr.ariaCurrent = 'true'
}

export default active
