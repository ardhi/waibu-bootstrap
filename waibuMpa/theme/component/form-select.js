import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect (params = {}) {
  const { groupAttrs } = this.plugin.app.waibuMpa

  this._normalizeAttr(params, { autoId: true })
  if (!params.attr.label && params.attr.name) params.attr.label = this.req.t(`field.${params.attr.name}`)
  if (params.attr.noLabel) delete params.attr.label
  const group = groupAttrs(params.attr, ['label', 'hint', 'wrapper', 'col'], false)
  const contents = await handleInput.call(this, { handler: buildFormSelect, params, group })
  if (params.attr.noWrapper) params.noTag = true
  else {
    params.attr = group.wrapper
    params.tag = 'div'
  }
  params.html = contents.join('\n')
  if (group._.col) {
    group.col.col = group._.col
    const grid = await this.buildTag({ tag: 'gridCol', attr: group.col, html: '\t' })
    const [prepend, append] = grid.split('\t')
    params.prepend = prepend
    params.append = append
  }
}

export default formSelect
