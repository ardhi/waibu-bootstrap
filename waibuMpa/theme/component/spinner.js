import { sizes, parseSimple } from './_after-build-tag/_lib.js'
const types = ['border', 'grow']

const spinner = {
  handler: async function (params = {}) {
    const type = types.includes(params.attr.type) ? params.attr.type : 'border'
    const cls = `spinner-${type}`
    this._normalizeAttr(params, { tag: 'div', cls, role: 'status' })
    if (params.attr.size) params.attr.class.push(parseSimple.call(this, { cls, value: params.attr.size, values: sizes }))
    params.html = `<span class="visually-hidden">${params.req.t('Loading...')}</span>`
  }
}

export default spinner
