import { buildFormPlaintext } from './_lib.js'
import { build } from './form-input.js'

async function formPlaintext () {
  return class FormPlaintext extends this.app.baseClass.MpaWidget {
    build = async () => {
      const { req } = this.component
      const { isEmpty, get } = this.app.lib._
      const { escape } = this.app.waibu
      this.params.attr.disabled = true
      this.params.attr.background = 'color:secondary opacity:10'
      const { name } = this.params.attr
      if (this.params.attr.labelFloating) this.params.attr.class.push('border', 'rounded')
      if (!isEmpty(name) && isEmpty(this.params.attr.value)) {
        const prop = this.getProp(name)
        const dataValue = this.formData[name] ?? ''
        let value = get(this.oldData, `_fmt.${name}`, get(this.formData, `_fmt.${name}`, dataValue))
        const format = get(this.schema, `view.format.${name}`)
        const labelField = get(this.schema, `view.widget.${name}.attr.labelField`)
        if (prop.ref) {
          const result = this.getRefValue({ field: name, labelField, refName: this.getRefName(name) })
          if (result) {
            value = format ? await format.call(this, value, this.formData, { req }) : result
          }
        } else if (format) value = await format.call(this, value, this.formData, { req })
        this.params.attr.dataValue = escape(dataValue)
        this.params.attr.value = value
        this.params.attr.dataType = prop.type
      }
      await build.call(this, buildFormPlaintext, this.params)
    }
  }
}

export default formPlaintext
