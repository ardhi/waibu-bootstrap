async function factory (pkgName) {
  const me = this

  return class WaibuBootstrap extends this.lib.BajoPlugin {
    constructor () {
      super(pkgName, me.app)
      this.alias = 'wbs'
      this.dependencies = ['waibu-mpa', 'waibu-extra']
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
}

export default factory
