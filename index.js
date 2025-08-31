async function factory (pkgName) {
  const me = this

  class WaibuBootstrap extends this.app.pluginClass.base {
    static alias = 'wbs'
    static dependencies = ['waibu-mpa', 'waibu-extra']

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
