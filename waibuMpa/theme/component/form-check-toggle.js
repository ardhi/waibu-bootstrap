import { buildFormLabel, buildFormCheckToggle } from './_lib.js'

export async function build (item, { params, reply } = {}) {
  const { has, omit } = this._
  const { groupAttrs } = this.mpa
  const colors = [...this.getAttrValues.variant]

  const attr = groupAttrs(params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = params.attr.id ?? this.plugin.app.bajo.generateId()
  if (has(attr._, 'color')) {
    const [core, variant] = attr._.color.split(':')
    if (colors.includes(core)) {
      const cls = ['btn']
      if (['outline'].includes(variant)) cls.push(variant)
      cls.push(core)
      attr.label.class.push(cls.join('-'))
    }
  }
  attr._ = omit(attr._, ['color'])

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
