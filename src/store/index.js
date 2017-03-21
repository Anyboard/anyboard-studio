import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colours: []
  },
  mutations: {
    save (state, colours) {
      state.colours = colours
    }
  }
})

