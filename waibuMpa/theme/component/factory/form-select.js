import { buildFormSelect } from './_lib.js'
import { handleInput } from './form-input.js'

async function formSelect () {
  return class FormSelect extends this.baseFactory {
    constructor (options) {
      super(options)
      this.component.normalizeAttr(this.params, { autoId: true })
      if (!this.params.attr.label && this.params.attr.name) this.params.attr.label = this.component.req.t(`field.${this.params.attr.name}`)
      if (this.params.attr.noLabel) delete this.params.attr.label
    }

    async build () {
      const { groupAttrs } = this.plugin.app.waibuMpa
      const group = groupAttrs(this.params.attr, ['label', 'hint', 'wrapper', 'col'], false)
      const contents = await handleInput.call(this, { handler: buildFormSelect, params: this.params, group })
      if (this.params.attr.noWrapper) this.params.noTag = true
      else {
        this.params.attr = group.wrapper
        this.params.tag = 'div'
      }
      this.params.html = contents.join('\n')
      if (group._.col) {
        group.col.col = group._.col
        const grid = await this.component.buildTag({ tag: 'gridCol', attr: group.col, html: '\t' })
        const [prepend, append] = grid.split('\t')
        this.params.prepend = prepend
        this.params.append = append
      }
    }
  }
}

export default formSelect
