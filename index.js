/**
 * Plugin factory
 *
 * @param {string} pkgName - NPM package name
 * @returns {class}
 */
async function factory (pkgName) {
  const me = this

  /**
   * WaibuBootstrap class
   *
   * @class
   */
  class WaibuBootstrap extends this.app.baseClass.Base {
    constructor () {
      super(pkgName, me.app)
      this.config = {
        waibu: {
          prefix: 'bootstrap'
        },
        siteSetting: {
          toastAutohideDelayDur: '5s'
        }
      }
    }
  }

  return WaibuBootstrap
}

export default factory
