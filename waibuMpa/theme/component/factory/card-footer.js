import { handler } from './card-header.js'
const cls = 'card-footer'

async function cardFooter () {
  return class CardFooter extends this.baseFactory {
    constructor (options) {
      super(options)
      this.selector = '.' + cls
    }

    build = async () => {
      await handler.call(this, cls, this.params)
    }
  }
}

export default cardFooter
