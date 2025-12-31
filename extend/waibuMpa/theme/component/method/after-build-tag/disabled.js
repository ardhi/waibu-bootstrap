function disabled ({ key, params }) {
  params.attr.class.push(key)
  params.attr.ariaDisabled = 'true'
}

export default disabled
