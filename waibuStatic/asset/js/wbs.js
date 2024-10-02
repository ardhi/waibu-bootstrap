/* global bootstrap, wmpa */

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
    const el = document.getElementById(id)
    return bootstrap[type].getOrCreateInstance(el)
  }

  async notify (msg, { title, caption, color = 'info' } = {}) {
    const id = wmpa.generateId()
    let body = `<c:toast id="${id}" t:content="${msg}" background="color:${color}" `
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

  async copyToClipboard (selector) {
    await wmpa.copyToClipboard(selector)
    await this.notify('Copied!')
  }

  async confirmation (msg, handler, opts = {}) {
    if (wmpa.isPlainObject(handler)) {
      opts = handler
      handler = undefined
    }
    opts.icon = 'signQuestion'
    opts.buttons = [
      { label: 'Cancel', color: 'secondary', dismiss: true },
      { label: 'OK', color: 'primary', dismiss: !opts.okHandler, handler: opts.okHandler }
    ]
    await this.alert(msg, opts.title ?? 'Confirmation', opts)
  }

  async alert (msg, title, opts = {}) {
    const id = wmpa.generateId()
    if (wmpa.isPlainObject(title)) {
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
      else if (b.handler) btn += `x-data @click="await ${b.handler}('${id}')" />`
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
}

const wbs = new Wbs() // eslint-disable-line no-unused-vars
