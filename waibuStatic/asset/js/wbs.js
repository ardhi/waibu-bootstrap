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

  async notify (msg, { title, caption, color = 'info' } = {}) {
    const id = `toast${Date.now()}`
    let body = `<c:toast id="${id}" t:content="${msg}" background="color:${color}" `
    if (title) body += `title="${title}" `
    if (caption) body += `caption="${caption}" `
    body += '/>'
    await wmpa.renderComponent(body, '.toast-container', true)
    const el = document.getElementById(id)
    if (!el) return
    const instance = window.bootstrap.Toast.getOrCreateInstance(el)
    instance.show()
    el.addEventListener('hidden.bs.toast', () => {
      el.remove()
    })
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
}

const wbs = new Wbs() // eslint-disable-line no-unused-vars
