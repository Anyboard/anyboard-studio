import Vue from 'vue'
import Vuex from 'vuex'

import fabricInspector from './store/fabric_inspector.js'
import fabricCanvas from './store/fabric_canvas.js'
import blockly from './store/blockly.js'
import ledgrid from './store/ledgrid.js'

// Setting the root Vue-instance to use Vuex
Vue.use(Vuex)

// Initiating a new Store
export default new Vuex.Store({

  // The state object holds all the data that needs to be globally accessible, but should never be directly referenced.
  state: {},

  // Mutations are functions for changing a single state and must be synchronous. Keep them simple.
  mutations: {},

  // Actions are more complex methods that mutate one or more states by calling the corresponding mutation. Actions allows asynchronousity.
  actions: {},
  // When you need data from the store use it's corresponding getter.
  getters: {},

  // Child stores are imported and referenced here
  modules: {
    fabricInspector,
    fabricCanvas,
    blockly,
    ledgrid
  }
})
