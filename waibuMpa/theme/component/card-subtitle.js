const cls = 'card-subtitle'

const cardSubtitle = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    params.tag = 'h6'
    params.attr.class.push(cls, 'mb-2', 'text-body-secondary')
  }
}

export default cardSubtitle
