/**
 * Created by KristAN SPAngelica on 05-Apr-17.
 */

import {binaryToHex, hexToBinary, binaryToList} from '../utilities/helpers'
import Vue from 'vue'
import FileSaver from 'file-saver'

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
      'frown': '00242424003C4200',
      'cross': '8142241818244281',
      'checkmark': '0001020488502000'
    },
    selectedGrid: ''
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
        Vue.set(state.savedGrids, payload.name, data.result)
      }
    },
    UPDATE_GRID (state, payload) {
      let data = binaryToHex(payload.str)
      if (data.valid) {
        state.savedGrids[state.selectedGrid] = data.result
      }
    },
    SELECT_GRID (state, gridName) {
      state.selectedGrid = gridName
    },
    DELETE_GRID (state) {
      Vue.delete(state.savedGrids, state.selectedGrid)
    },
    DOWNLOAD_GRIDS (state) {
      const blob = new Blob([JSON.stringify(state.savedGrids)], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'Grids.json')
    },

    UPLOAD_GRIDS (state, payload) {
      state.savedTokens = payload
    }
  },
  actions: {
    setGrid ({commit, state}, hexString) {
      var binaryString = hexToBinary(hexString)['result']
      var newGrid = binaryToList(binaryString)
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
    updateGrid ({commit}, payload) {
      commit('UPDATE_GRID', payload)
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
    },
    deselectGrid ({commit, state}, gridName) {
      commit('SELECT_GRID', '')
    },
    deleteGrid ({commit, state}, gridName) {
      commit('DELETE_GRID')
      commit('CLEAR_GRID')
      commit('SELECT_GRID', '')
    },
    downloadGrids ({commit}) {
      commit('DOWNLOAD_GRIDS')
    },
    uploadGrids ({commit}, grids) {
      commit('UPLOAD_GRIDS', grids)
    }
  },
  getters: {
    GET_SAVEDLEDGRIDS: state => {
      return state.savedGrids
    }
  }
}
