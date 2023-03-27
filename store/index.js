export const state = () => ({
  showSidebarMobile: false,
});

export const mutations = {
  setShowSidebarMobile(state, payload) {
    state.showSidebarMobile = payload
  }
};

export const getters = {
  showSidebarMobile(state) {
    return state.showSidebarMobile
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }, { }) {
    // emit action theme init
    await dispatch('theme/init')
  }
}
