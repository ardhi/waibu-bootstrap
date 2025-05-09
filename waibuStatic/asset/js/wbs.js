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

  notifyHtml (id, html) {
    wmpa.addComponentHtml(html, '.toast-container')
    const el = document.getElementById(id)
    if (!el) return
    el.addEventListener('hidden.bs.toast', () => {
      el.remove()
    })
    const instance = this.getInstance('Toast', id)
    instance.show()
  }

  async notify (msg, { title, caption, type = 'info', transValue = [] } = {}) {
    const id = wmpa.randomId()
    if (_.isString(transValue)) transValue = [transValue]
    transValue = transValue.join('|')
    let body = `<c:toast id="${id}" background="color:${type}" `
    if (title) body += `title="${title}" `
    if (caption) body += `caption="${caption}" `
    body += `><c:t value="${transValue}">${msg}</c:t></c:toast>`
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
      { label: 'cancel', color: 'secondary', dismiss: true },
      { label: 'ok', color: 'primary', dismiss: !opts.ok, alertType: 'confirmation', handler: opts.ok, handlerOpts: opts.opts ?? '', close: opts.close ?? '' }
    ]
    return await this.alert(msg, opts.title ?? 'confirmation', opts)
  }

  async prompt (msg, value, opts = {}) {
    if (_.isPlainObject(value)) {
      opts = value
      value = undefined
    }
    opts.content = [
      `<c:form-input x-data="{
        submit (evt) {
          this.$el.closest('.modal-body').querySelector('button[type=submit]').click()
        }
      }" @keyup.enter="submit" value="` + (value ?? opts.value) + '"/>',
      msg ? ('<c:div margin="top-3"><c:t>' + msg + '</c:t></c:div>') : ''
    ].join('\n')
    opts.close = opts.close ?? ''
    opts.buttons = [
      { label: 'cancel', color: 'secondary', dismiss: true },
      { label: 'ok', type: 'submit', color: 'primary', dismiss: !opts.ok, alertType: 'prompt', handler: opts.ok, handlerOpts: opts.opts ?? '', close: opts.close ?? '' }
    ]
    return await this.alert(msg, opts.title ?? 'Prompt', opts)
  }

  async appLauncher (params, menu) {
    document.body.click()
    const id = wmpa.randomId()
    const toolbar = params ? `toolbar="${params}"` : ''
    const menuId = menu ? `menu="${menu}"` : ''
    const body = [`<c:app-launcher id="${id}" ${toolbar} ${menuId} />`]
    await wmpa.addComponent(body.join('\n'), 'body')
    const item = new bootstrap.Offcanvas(`#${id}`)
    const itemEl = document.getElementById(id)
    itemEl.addEventListener('hidden.bs.offcanvas', evt => {
      itemEl.remove()
    })
    item.show()
    return id
  }

  async alert (msg, title, opts = {}) {
    const id = wmpa.randomId()
    if (_.isPlainObject(title)) {
      opts = title
      title = undefined
    }
    let { type = 'info', icon, centered = true, buttons, transValue = [] } = opts
    if (_.isString(transValue)) transValue = [transValue]
    transValue = transValue.join('|')
    buttons = buttons ?? [{ label: 'OK', color: 'primary', dismiss: true }]
    icon = icon ?? 'sign' + (type.charAt(0).toUpperCase() + type.slice(1))
    switch (type) {
      case 'danger': title = title ?? 'error'; break
      case 'warning': title = title ?? 'warning'; break
      default: title = title ?? 'information'
    }
    buttons = buttons.map(b => {
      b.handlerOpts = wmpa.toBase64(JSON.stringify(b.handlerOpts))
      let btn = `<c:btn type="${b.type ?? 'button'}" margin="start-2" ${b.id ? `id="${b.id}"` : ''} color="${b.color}" t:content="${b.label}" `
      if (b.dismiss) btn += 'dismiss />'
      else if (b.handler) btn += `x-data @click="wbs.handleAlert('${b.handler}', '${id}', '${b.handlerOpts ?? ''}', '${b.close ?? ''}', '${b.alertType ?? 'alert'}')" />`
      else btn += '/>'
      return btn
    })
    const body = [`<c:modal id="${id}" ${centered ? 'centered' : ''} t:title="${title}">`]
    if (opts.content) body.push(opts.content)
    else {
      body.push('<c:div flex="justify-content:between align-items:start">')
      body.push(`<c:div margin="end-3"><c:icon font="size:1" name="${icon}" /></c:div>`)
      body.push(`<c:div dim="width:100"><c:t value="${transValue}">${msg}</c:t></c:div>`)
      body.push('</c:div>')
    }
    body.push('<c:div flex="justify-content:end" margin="top-3">')
    body.push(...buttons)
    body.push('</c:div></c:modal>')
    await wmpa.addComponent(body.join('\n'), 'body')
    const modal = new bootstrap.Modal(`#${id}`)
    const modalEl = document.getElementById(id)
    modalEl.addEventListener('hidden.bs.modal', evt => {
      modalEl.remove()
    })
    modalEl.addEventListener('shown.bs.modal', evt => {
      const input = modalEl.querySelector('input')
      if (input) input.focus()
    })
    modal.show()
    return id
  }

  closeModal (id) {
    this.getInstance('Modal', id).hide()
  }

  handleAlert (name, modalId, opts, close, alertType) {
    const callFn = (fn) => {
      let value
      if (alertType === 'prompt') {
        value = document.querySelector('#' + modalId + ' input.form-control').value
      }
      if (wmpa.isAsync(fn)) fn(modalId, opts, value).then()
      else fn(modalId, opts, value)
    }
    if (close !== '') this.closeModal(modalId)
    if (name.includes(':')) {
      const [ns, ...method] = name.split(':')
      const fn = wmpa.alpineScopeMethod(method.join(':'), '#' + ns)
      if (fn) callFn(fn)
      else console.error(`Component method not found: ${name}`)
      return
    }
    const fn = _.get(window, name)
    if (fn) callFn(fn)
    else console.error(`Function not found '${name}'`)
  }

  async openModal (id, body, type = 'modal') {
    if (_.isArray(body)) body = body.join('\n')
    if (!['modal', 'offcanvas'].includes(type)) type = 'modal'
    await wmpa.addComponent(body)
    const item = new bootstrap[_.upperFirst(type)](`#${id}`)
    const itemEl = document.getElementById(id)
    itemEl.addEventListener(`hidden.bs.${type}`, evt => {
      itemEl.remove()
    })
    item.show()
    return id
  }
}

const wbs = new Wbs() // eslint-disable-line no-unused-vars
