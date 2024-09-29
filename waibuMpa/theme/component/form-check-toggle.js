import { buildFormLabel, buildFormCheckToggle } from './_lib.js'
import { parseVariant, colors } from './_after-build-tag/_lib.js'
const variants = ['outline']

export async function build (handler, params = {}) {
  const { groupAttrs } = this.plugin.app.waibuMpa
  this._normalizeAttr(params)
  if (!params.attr.label && params.attr.name) params.attr.label = this.req.t(`field.${params.attr.name}`)
  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  if (attr._.color) attr.label.class.push(parseVariant.call(this, { cls: 'btn', value: attr._.color, values: colors, variants, prepend: true }))
  delete attr._.color

  contents.push(await handler.call(this, attr, params))
  contents.push(await buildFormLabel.call(this, attr, undefined, 'btn'))
  params.attr = attr.wrapper
  params.noTag = true
  params.html = contents.join('\n')
}

async function formCheckToggle (params = {}) {
  const { has } = this.plugin.app.bajo.lib._
  if (!has(params.attr, 'label')) params.attr.label = this.req.t('Toggle Check')
  await build.call(this, buildFormCheckToggle, params)
}

export default formCheckToggle
