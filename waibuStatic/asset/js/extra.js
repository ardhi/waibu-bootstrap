/* global bootstrap, hljs */
// enable popovers, tooltips, toasts
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)) // eslint-disable-line no-unused-vars
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)) // eslint-disable-line no-unused-vars
const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl))
toastList.forEach(toast => toast.show())
// extra scripts
hljs.highlightAll()

function invalidateForm (evt) { // eslint-disable-line no-unused-vars
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
