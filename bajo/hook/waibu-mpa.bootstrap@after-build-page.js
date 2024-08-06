async function waibuMpaBootstrapAfterBuildPage ({ $, reply }) {
  if (reply.request.darkMode) $('html').attr('data-bs-theme', 'dark')
}

export default waibuMpaBootstrapAfterBuildPage
