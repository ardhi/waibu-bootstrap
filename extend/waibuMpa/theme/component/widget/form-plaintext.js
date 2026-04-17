import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext () {
  return class FormPlaintext extends this.app.baseClass.MpaWidget {
    build = async () => {
      const { isEmpty, get } = this.app.lib._
      const { req } = this.component
      const { escape } = this.app.waibu
      this.params.attr.disabled = true
      const { name } = this.params.attr
      if (this.params.attr.labelFloating) this.params.attr.class.push('border', 'rounded')
      if (!isEmpty(name) && isEmpty(this.params.attr.value)) {
        const prop = this.getProp(name)
        const dataValue = get(this.formData, `_orig.${name}`, '')
        let value = get(this.oldData, name, get(this.formData, name, ''))
        const format = get(this.schema, `view.format.${name}`)
        const formatValue = get(this.schema, `view.formatValue.${name}`)
        const labelField = get(this.schema, `view.widget.${name}.attr.labelField`)
        if (formatValue) value = await formatValue.call(this, value, this.formData, { req })
        else if (prop.ref) {
          value = this.getRefValue({ field: name, labelField, refName: this.getRefName(name) })
          if (format && !isEmpty(value)) this.params.attr.href = await format.call(this, value, this.formData, { linkOnly: true })
        } else if (format && !isEmpty(value)) value = await format.call(this, value, this.formData)
        this.params.attr.dataValue = escape(dataValue)
        this.params.attr.value = escape(value)
        this.params.attr.dataType = prop.type
      }
      await build.call(this, buildFormPlaintext, this.params)
    }
  }
}

export default formPlaintext
