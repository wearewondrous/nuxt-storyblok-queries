export default async function ({ store, $storyblok }) {
  const lang = $storyblok.getCurrentLang()

  if (lang !== store.state.storyBlok.language) {
    store.commit('storyBlok/setLanguage', lang)
    await store.dispatch('storyBlok/loadSettings')
  }
}
