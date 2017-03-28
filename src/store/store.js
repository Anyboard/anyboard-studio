import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    canvasState: 0,
    colours: []
  },
  actions: {
    SAVE_CANVAS: function ({commit}, canvas) {
      commit('SET_CANVAS', canvas)
    },
    SAVE_COLOURS: function ({commit}, colours) {
      commit('SET_COLOURS', colours)
    }
  },
  mutations: {
    SET_CANVAS: (state, canvas) => {
      state.canvasState = canvas
    },
    SET_COLOURS: (state, colours) => {
      state.colours = colours
    }
  },
  getters: {
    GET_CANVAS: state => {
      return state.canvasState
    },
    GET_COLOURS: state => {
      return state.colours
    }
  },
  modules: {

  }
})
export default store
