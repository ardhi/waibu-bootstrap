async function waibuMpaAfterBuildPage ({ $, theme, req }) {
  if (req.darkMode && theme.name === 'bootstrap') $('body').attr('data-bs-theme', 'dark')
}

export default waibuMpaAfterBuildPage
