import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // lines: {}
    // emails: []
  },
  mutations: {
    // UPDATELINES (state, lines) { state.lines = lines },
    // UPDATEEMAILS (state, emails) { state.emails = emails }
  },

  actions: {
    // update ({ commit }, obj) {
    //  console.log(obj.emails)
    // commit('UPDATELINES', obj.lines)
    //  commit('UPDATEEMAILS', obj.emails)
    // }
  },

  getters: {
    // lines: state => state.lines,
    
    /**
    emails: state => {
      let str = ''

      for (let i in state.emails) {
        if (str.length > 0) { str += ', ' }
        str += state.emails[i].toLowerCase()
      }

      return str
    }
    */


    
  }
})
