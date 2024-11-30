import { handler } from './card-header.js'
const cls = 'card-footer'

async function cardFooter (component) {
  return class CardFooter extends component.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    async build () {
      await handler.call(this, cls, this.params)
    }
  }
}

export default cardFooter
