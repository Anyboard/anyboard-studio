/**
 * Created by Kriestian Spanck on 25.04.2017.
 */

export default {
  namespaced: true,
  state: {
    nameType: 'static'
  },
  mutations: {
    INVERT_NAME_TYPE (state) {
      switch (state.nameType) {
        case 'dynamic':
          state.nameType = 'static'
          break
        case 'static':
          state.nameType = 'dynamic'
          break
      }
    }
  },
  actions: {
    updateNameType ({commit}) {
      commit('INVERT_NAME_TYPE')
    }
  },
  getters: {}
}
