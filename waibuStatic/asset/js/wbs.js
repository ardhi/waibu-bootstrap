/* global bootstrap, wmpa, _ */

class Wbs {
  constructor () {
    this.init()
  }

  init () {
    window.addEventListener('load', evt => {
      const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
      const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)) // eslint-disable-line no-unused-vars
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)) // eslint-disable-line no-unused-vars
      const toastElList = document.querySelectorAll('.toast')
      const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))
      toastList.forEach(toast => toast.show())
    })
  }

  getInstance (type, id) {
    if (type === 'Drawer') type = 'Offcanvas'
    const el = typeof id === 'string' ? document.getElementById(id) : id
    return bootstrap[type].getOrCreateInstance(el)
  }

  async notify (msg, { title, caption, type = 'info' } = {}) {
    const id = wmpa.randomId()
    let body = `<c:toast id="${id}" t:content="${msg}" background="color:${type}" `
    if (title) body += `title="${title}" `
    if (caption) body += `caption="${caption}" `
    body += '/>'
    await wmpa.addComponent(body, '.toast-container')
    const el = document.getElementById(id)
    if (!el) return
    el.addEventListener('hidden.bs.toast', () => {
      el.remove()
    })
    const instance = this.getInstance('Toast', id)
    instance.show()
  }

  invalidateForm (evt) {
    const items = document.querySelectorAll('form .is-invalid')
    items.forEach(item => {
      item.classList.remove('is-invalid')
    })
    const feedback = document.querySelectorAll('form .invalid-feedback')
    feedback.forEach(item => {
      item.remove()
    })
    evt.target.remove()
  }

  async copyToClipboard (selector, isSelector) {
    await wmpa.copyToClipboard(selector, isSelector)
    await this.notify('Copied!')
  }

  async confirmation (msg, handler, opts = {}) {
    if (_.isPlainObject(handler)) {
      opts = handler
      handler = undefined
    }
    opts.icon = 'signQuestion'
    opts.buttons = [
      { label: 'Cancel', color: 'secondary', dismiss: true },
      { label: 'OK', color: 'primary', dismiss: !opts.ok, handler: opts.ok, handlerOpts: opts.opts ?? '', close: opts.close ?? '' }
    ]
    return await this.alert(msg, opts.title ?? 'Confirmation', opts)
  }

  async alert (msg, title, opts = {}) {
    const id = wmpa.randomId()
    if (_.isPlainObject(title)) {
      opts = title
      title = undefined
    }
    let { type = 'info', icon, centered = true, buttons } = opts
    buttons = buttons ?? [{ label: 'OK', color: 'primary', dismiss: true }]
    icon = icon ?? 'sign' + (type.charAt(0).toUpperCase() + type.slice(1))
    switch (type) {
      case 'danger': title = title ?? 'Error'; break
      case 'warning': title = title ?? 'Warning'; break
      default: title = title ?? 'Information'
    }
    buttons = buttons.map(b => {
      let btn = `<c:btn margin="start-2" ${b.id ? `id="${b.id}"` : ''} color="${b.color}" t:content="${b.label}" `
      if (b.dismiss) btn += 'dismiss />'
      else if (b.handler) btn += `x-data @click="wbs.dispatchAlert('${b.handler}', '${id}', '${b.handlerOpts ?? ''}', '${b.close ?? ''}')" />`
      else btn += '/>'
      return btn
    })
    const body = [`<c:modal id="${id}" ${centered ? 'centered' : ''} t:title="${title}"><c:div flex="justify-content:between align-items:start">`]
    body.push(`<c:div margin="end-3"><c:icon font="size:1" name="${icon}" /></c:div><c:div dim="width:100">${msg}</c:div></c:div>`)
    body.push('<c:div flex="justify-content:end" margin="top-3">')
    body.push(...buttons)
    body.push('</c:div></c:modal>')
    await wmpa.addComponent(body.join('\n'), 'body')
    const modal = new bootstrap.Modal(`#${id}`)
    const modalEl = document.getElementById(id)
    modalEl.addEventListener('hidden.bs.modal', evt => {
      modalEl.remove()
    })
    modal.show()
    return id
  }

  dispatchAlert (name, id, opts, close) {
    if (close !== '') {
      const instance = this.getInstance('Modal', id)
      instance.hide()
    }
    if (name.includes(':')) {
      const [id, method] = name.split(':')
      const el = document.getElementById(id)
      const fn = _.get(el, `_x_dataStack.0.${method}`)
      if (!fn) console.error(`Component method not found: ${name}`)
      else if (wmpa.isAsync(fn)) fn(opts).then()
      else fn(opts)
      return
    }
    const fn = _.get(window, name)
    if (fn) fn(opts).then()
    else console.error(`Function not found '${name}'`)
  }
}

const wbs = new Wbs() // eslint-disable-line no-unused-vars
