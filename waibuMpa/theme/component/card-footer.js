import { handler } from './card-header.js'
const cls = 'card-footer'

const cardFooter = {
  selector: '.' + cls,
  handler: async function (params = {}) {
    await handler.call(this, cls, params)
  }
}

export default cardFooter
