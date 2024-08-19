const tr = {
  selector: '.table tbody',
  handler: async function ({ params }) {
    const { has, omit } = this._
    params.tag = 'tbody'
    const attr = params.attr
    if (has(attr, 'divider')) attr.class.push('table-group-divider')
    params.attr = omit(attr, ['divider'])
  }
}

export default tr
