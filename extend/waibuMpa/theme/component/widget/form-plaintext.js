import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext () {
  return class FormPlaintext extends this.app.baseClass.MpaWidget {
    build = async () => {
      const { isEmpty, get } = this.app.lib._
      const { escape } = this.app.waibu
      const { isHtmlLink } = this.app.bajoExtra
      this.params.attr.disabled = true
      const { name } = this.params.attr
      if (this.params.attr.labelFloating) this.params.attr.class.push('border', 'rounded')
      if (!isEmpty(name) && isEmpty(this.params.attr.value)) {
        const prop = this.getProp(name)
        const dataValue = this.formData[name] ?? ''
        let value = get(this.oldData, `_fmt.${name}`, get(this.formData, `_fmt.${name}`, dataValue))
        const format = get(this.schema, `view.format.${name}`)
        const labelField = get(this.schema, `view.widget.${name}.attr.labelField`)
        if (prop.ref) {
          const newValue = this.getRefValue({ field: name, labelField, refName: this.getRefName(name) })
          if (format && !isEmpty(newValue)) this.params.attr.href = await format.call(this, newValue, this.formData, { linkOnly: true })
        } else if (format && !isEmpty(value)) value = await format.call(this, value, this.formData)
        this.params.attr.dataValue = escape(dataValue)
        if (!isHtmlLink(value)) this.params.attr.value = escape(value)
        this.params.attr.dataType = prop.type
      }
      await build.call(this, buildFormPlaintext, this.params)
    }
  }
}

export default formPlaintext
