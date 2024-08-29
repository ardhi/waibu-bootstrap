import { levels, weights, fstyles } from './_lib.js'

function font ({ key, params }) {
  const { uniq } = this._
  const attrs = this.mpa.attrToArray(params.attr[key])
  for (const attr of attrs) {
    const [item, value] = attr.split(':')
    for (const val of uniq((value ?? '').split(','))) {
      switch (item) {
        case 'size': if (levels.includes(val)) params.attr.class.push(`fs-${val}`); break
        case 'weight': if (weights.includes(val)) params.attr.class.push(`fw-${val}`); break
        case 'style': if (fstyles.includes(val)) params.attr.class.push(`fst-${val}`); break
      }
    }
  }
}

export default font
