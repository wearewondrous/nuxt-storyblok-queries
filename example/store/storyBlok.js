export const state = () => ({
  language: '',
  settings: {
    meta: []
  }
})

export const getters = {
  language: store => store.language,
  settings: store => store.settings
}

export const mutations = {
  setLanguage(state, language) {
    state.language = language
  },
  setSettings(state, settings) {
    state.settings = settings
  }
}

export const actions = {
  async loadSettings({ commit }) {
    const settings = await this.$storyblok.getCurrentSettings()

    commit('setSettings', settings.story.content)
  }
}
