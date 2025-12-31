async function waibuMpaBootstrapAfterBuildPage ({ $, req }) {
  if (req.darkMode) $('html').attr('data-bs-theme', 'dark')
}

export default waibuMpaBootstrapAfterBuildPage
