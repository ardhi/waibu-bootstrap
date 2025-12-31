import { buildFormLabel, buildFormCheckToggle } from './_lib.js'
import { parseVariant, colors } from '../method/after-build-tag/_lib.js'
const variants = ['outline']

export async function build (handler, params = {}) {
  const { groupAttrs } = this.app.waibuMpa
  const { generateId } = this.app.lib.aneka
  this.component.normalizeAttr(this.params)
  if (!this.params.attr.label && this.params.attr.name) this.params.attr.label = this.component.req.t(`field.${this.params.attr.name}`)
  const attr = groupAttrs(this.params.attr, ['label', 'hint', 'wrapper'])
  const contents = []
  attr._.id = this.params.attr.id ?? generateId()
  if (attr._.color) attr.label.class.push(parseVariant.call(this, { cls: 'btn', value: attr._.color, values: colors, variants, prepend: true }))
  delete attr._.color

  contents.push(await handler.call(this, attr, this.params))
  contents.push(await buildFormLabel.call(this, attr, undefined, 'btn'))
  this.params.attr = attr.wrapper
  this.params.noTag = true
  this.params.html = contents.join('\n')
}

async function formCheckToggle () {
  return class FormCheckToggle extends this.baseFactory {
    build = async () => {
      const { has } = this.app.lib._
      const { req } = this.component
      if (!has(this.params.attr, 'label')) this.params.attr.label = req.t('Toggle Check')
      await build.call(this, buildFormCheckToggle, this.params)
    }
  }
}

export default formCheckToggle
