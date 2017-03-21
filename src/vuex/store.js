import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    canvasState: 0
  },
  actions: {
    SAVE_CANVAS: function ({commit}, canvas) {
      commit('SET_CANVAS', canvas)
    }
  },
  mutations: {
    SET_CANVAS: (state, canvas) => {
      state.canvasState = canvas
    }
  },
  getters: {
    GET_CANVAS: state => {
      return state.canvasState
    }
  },
  modules: {

  }
})
export default store
