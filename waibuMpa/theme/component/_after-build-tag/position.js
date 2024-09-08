import { positions, aligns, poses } from './_lib.js'
const zes = ['n1', '0', '1', '2', '3']

function position ({ key, params }) {
  const { without } = this.plugin.app.bajo.lib._
  const [type, arrangeStart, arrangeEnd, translateMiddle] = this.plugin.app.waibuMpa.attrToArray(params.attr[key])
  if (positions.includes(type)) {
    params.attr.class.push(`position-${type}`)
    if (without(positions, 'static').includes(type) && arrangeStart &&
      arrangeStart.startsWith('z-index:')) {
      const [, val] = arrangeStart.split(':')
      if (zes.includes(val)) params.attr.class.push(`z-${val}`)
      return
    }
    if (arrangeStart && arrangeEnd) {
      const [prop1, pos1] = arrangeStart.split('-')
      const [prop2, pos2] = arrangeEnd.split('-')
      if (aligns.includes(prop1) && poses.includes(pos1) && aligns.includes(prop2) && poses.includes(pos2)) {
        params.attr.class.push(`${prop1}-${pos1} ${prop2}-${pos2}`)
        if (translateMiddle) {
          let val = 'translate-middle'
          switch (translateMiddle) {
            case 'true': val += ''; break
            case 'x': val += '-x'; break
            case 'y': val += '-y'; break
            default: val = ''
          }
          if (val !== '') params.attr.class.push(val)
        }
      }
    }
  }
}

export default position
