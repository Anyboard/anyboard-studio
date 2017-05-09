/**
 * Created by Kriestian Spanck on 25.04.2017.
 */
import {insertIntoDict, colorHexToRGB, colorRGBToHex} from '../utilities/helpers.js'
import Vue from 'vue'
import FileSaver from 'file-saver'
export default {
  namespaced: true,

  state: {
    savedTokens: {
      'Dragon': [[0, 255, 0], 'allowLEDChange', 'allowLEDBlink', 'allowDoubleTap', 'allowShake', 'allowTilt', 'allowTurn', 'allowTokenToken'],
      'Human': [[255, 0, 0], 'allowLEDChange', 'allowLEDBlink', 'allowVibrate', 'allowTap', 'allowDoubleTap', 'allowTilt', 'allowTurn', 'allowTokenToken']
    },
    numberOfDynamicTokens: 0,
    selectedToken: '',
    LEDColor: '#00ffff',
    attributes: {
      allowLEDChange: true,
      allowLEDBlink: true,
      allowVibrate: true,
      allowTap: true,
      allowDoubleTap: true,
      allowShake: false,
      allowTilt: true,
      allowTurn: true,
      allowTokenToken: true
    }
  },

  mutations: {
    CHANGE_LED_COLOR (state, payload) {
      state.LEDColor = payload
    },
    UPDATE_TOKEN_ATTRIBUTE (state, payload) {
      Vue.set(state.attributes, payload, !state.attributes[payload])
    },
    SUBMIT_TOKEN (state, payload) {
      insertIntoDict(state.savedTokens, state.name, payload)
    },
    // saving the token to the store
    ADD_NEW_TOKEN (state, payload) {
      // combining disallowed actions and LED color to one list.
      // LED color is always the first item
      let tokenData = [colorHexToRGB(state.LEDColor)]

      // handling whether token will be created with a static name or a generic name.
      // if dynamic name is used, token will be named token+dynamicNumber, e.g. token1, token2, token3 etc.
      let name = 'token'
      if (!payload.dynamicName) {
        name += state.numberOfDynamicTokens
        state.numberOfDynamicTokens += 1
      } else {
        name = payload.name
      }
      // appending legal actions for the token.
      // the end result will be on the format [[R, G, B], 'legalAction1', legalAction2']
      for (let key in state.attributes) {
        if (state.attributes[key]) {
          tokenData.push(key)
        }
      }
      // inserting the new key-value pair into savedTokens.
      Vue.set(state.savedTokens, name, tokenData)
    },
    UPDATE_TOKEN (state) {
      // combining disallowed actions and LED color to one list.
      // LED color is always the first item
      let tokenData = [colorHexToRGB(state.LEDColor)]

      // appending legal actions for the token.
      // the end result will be on the format [[R, G, B], 'legalAction1', legalAction2']
      for (let key in state.attributes) {
        if (state.attributes[key]) {
          tokenData.push(key)
        }
      }

      Vue.set(state.savedTokens, state.selectedToken, tokenData)
    },
    SET_TOKEN (state, tokenName) {
      state.LEDColor = colorRGBToHex(state.savedTokens[tokenName][0])
      for (let key in state.attributes) {
        Vue.set(state.attributes, key, state.savedTokens[tokenName].includes(key))
      }
    },
    SELECT_TOKEN (state, tokenName) {
      state.selectedToken = tokenName
    },
    SET_STANDARD (state) {
      state.LEDColor = '#ff0000'
      for (let key in state.attributes) {
        Vue.set(state.attributes, key, true)
      }
    },
    DELETE_TOKEN (state) {
      Vue.delete(state.savedTokens, state.selectedToken)
    },

    DOWNLOAD_TOKENS (state) {
      const blob = new Blob([JSON.stringify(state.savedTokens)], {type: 'text/plain;charset=utf-8'})
      FileSaver.saveAs(blob, 'Tokens.json')
    },

    UPLOAD_TOKENS (state, payload) {
      state.savedTokens = payload
    }
  },

  actions: {
    changeLEDColor ({commit}, payload) {
      commit('CHANGE_LED_COLOR', payload)
    },
    updateBooleanAttributes ({commit}, payload) {
      commit('UPDATE_TOKEN_ATTRIBUTE', payload)
    },
    // Selects a token for viewing/editing
    selectToken ({commit}, tokenName) {
      commit('SET_TOKEN', tokenName)
      commit('SELECT_TOKEN', tokenName)
    },
    deselectToken ({commit}) {
      commit('SELECT_TOKEN', '')
    },
    setStandardToken ({commit}) {
      commit('SET_STANDARD')
    },
    saveToken ({commit}, payload) {
      commit('ADD_NEW_TOKEN', payload)
      commit('SET_STANDARD')
    },
    updateToken ({commit}) {
      commit('UPDATE_TOKEN')
    },
    deleteToken ({commit}) {
      commit('DELETE_TOKEN')
      commit('SET_STANDARD')
      commit('SELECT_TOKEN', '')
    },
    downloadTokens ({commit}) {
      commit('DOWNLOAD_TOKENS')
    },
    uploadTokens ({commit}, tokens) {
      commit('UPLOAD_TOKENS', tokens)
    }
  },

  getters: {
    GET_SAVEDTOKENS: state => {
      return state.savedTokens
    },
    GET_SELECTEDTOKEN: state => {
      return state.savedTokens[state.selectedToken]
    }
  }
}
