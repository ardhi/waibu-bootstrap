const baseClass = 'img'

const img = {
  selector: baseClass,
  handler: async function ({ params, reply } = {}) {
    params.baseClass = baseClass
    params.ezAttrs = [
      { key: 'responsive', value: 'fluid' },
      { key: 'rounded', baseClass: '' },
      { key: 'thumbnail', value: 'thumbnail' },
      'h-align'
    ]
  }
}

export default img
