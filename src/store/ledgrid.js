/**
 * Created by KristAN Angelica on 05-Apr-17.
 */

import {binaryToHex, hexToBinary, binaryToList} from '../utilities/helpers'

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
    savedGrids: {
      'smile': '0024242400423C00',
      'frown': '00242424003C4200'
    },
    selectedGrid: 'smile'
  },
  mutations: {
    SET_GRID (state, grid) {
      state.grid = grid
    },
    CLEAR_GRID (state) {
      state.grid = [
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false
      ]
    },
    PUSH_TO_SAVEDGRIDS (state, payload) {
      let data = binaryToHex(payload.str)
      if (data.valid) {
        state.savedGrids[payload.name] = data.result
      }
    },
    SELECT_GRID (state, gridName) {
      state.selectedGrid = gridName
    }
  },
  actions: {
    setGrid ({commit, state}, hexString) {
      var newGrid = binaryToList(hexToBinary(hexString))
      commit('SET_GRID', newGrid)
    },
    changeGrid ({commit, state}, n) {
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
      commit('CLEAR_GRID')
    },
    clearGrid ({commit}) {
      commit('CLEAR_GRID')
    },
    selectGrid ({commit, state}, gridName) {
      commit('SELECT_GRID', gridName)
      var hexString = state.savedGrids[gridName]
      var binaryString = hexToBinary(hexString)['result']
      var newGrid = binaryToList(binaryString)
      commit('SET_GRID', newGrid)
    }
  },
  getters: {
    GET_SAVEDLEDGRIDS: state => {
      return state.savedGrids
    }
  }
}
