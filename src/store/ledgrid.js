/**
 * Created by KristAN Angelica on 05-Apr-17.
 */

export default {
  namespaced: true,
  state: {
    grid: [
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false
    ],
    savedGrids: {}
  },
  mutations: {
    SET_GRID (state, grid) {
      state.grid = grid
    },
    PUSH_TO_SAVEDGRIDS (state, payload) {
      state.savedGrids[payload.name] = payload.str
    }
  },
  actions: {
    setGrid ({commit, state}, n) {
      const oldGrid = state.grid
      const newGrid = []

      for (let i = 0; i < oldGrid.length; i++) {
        newGrid[i] = oldGrid[i]
        if (i === n) newGrid[i] = !newGrid[i]
      }
      commit('SET_GRID', newGrid)
    },
    saveGrid ({commit}, payload) {
      commit('PUSH_TO_SAVEDGRIDS', payload)
    },
    clearGrid ({commit}) {
      commit('SET_GRID', [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ])
    }
  },
  getters: {}
}
