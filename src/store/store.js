import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    canvasState: 0,
    colours: [],
    blocklyState: 0
  },
  actions: {
    SAVE_CANVAS: function ({commit}, canvas) {
      commit('SET_CANVAS', canvas)
    },
    SAVE_COLOURS: function ({commit}, colours) {
      commit('SET_COLOURS', colours)
    },
    SAVE_BLOCKLY: function ({commit}, blockly) {
      commit('SET_BLOCKLY', blockly)
    }
  },
  mutations: {
    SET_CANVAS: (state, canvas) => {
      state.canvasState = canvas
    },
    SET_COLOURS: (state, colours) => {
      state.colours = colours
    },
    SET_BLOCKLY: (state, blockly) => {
      state.blocklyState = blockly
    }
  },
  getters: {
    GET_CANVAS: state => {
      return state.canvasState
    },
    GET_COLOURS: state => {
      return state.colours
    },
    GET_BLOCKLY: state => {
      return state.blocklyState
    }
  },
  modules: {

  }
})
export default store
