/**
 * Created by Magda Angelica on 05-Apr-17.
 */

export default {
  namespaced: true,
  state: {paragraph: 'Height: '},
  mutations: {
    SET_PARAGRAPH (state, payload) {
      state.paragraph = payload
    }
  },
  actions: {
    setParagraph ({commit}, para) {
      commit('SET_PARAGRAPH', para)
    }
  },
  getters: {}
}
