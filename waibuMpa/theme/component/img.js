import { parseSimple } from './_after-build-tag/_lib.js'
const cls = 'img'

const img = {
  selector: cls,
  handler: async function (params = {}) {
    params.cls = cls
    if (params.attr.responsive) params.attr.class.push(`${cls}-fluid`)
    params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.thumbnail, values: ['thumbnail'] }))
  }
}

export default img
