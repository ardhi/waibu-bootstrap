import { buildFormLabel, buildFormCheckToggle } from './_lib.js'
import { parseVariant, colors } from './_after-build-tag/_lib.js'
const variants = ['outline']

export async function build (item, { params, reply } = {}) {
  const { groupAttrs } = this.mpa

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  attr.label.class.push(parseVariant.call(this, { cls: 'btn', value: attr._.color, values: colors, variants, prepend: true }))
  delete attr._.color

  contents.push(await item.call(this, attr))
  contents.push(await buildFormLabel.call(this, attr, undefined, 'btn'))
  params.attr = attr.wrapper
  params.noTag = true
  params.html = contents.join('\n')
}

async function formCheckToggle ({ params, reply } = {}) {
  const { has } = this._
  if (!has(params.attr, 'label')) params.attr.label = reply.request.t('Toggle Check')
  await build.call(this, buildFormCheckToggle, { params, reply })
}

export default formCheckToggle
