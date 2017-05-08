/**
 * Created by Kriestian Spanck on 25.04.2017.
 */
import {insertIntoDict, colorHexToRGB} from '../utilities/helpers.js'
import Vue from 'vue'
export default {
  namespaced: true,

  state: {
    savedTokens: {
      'Dragon': [[0, 255, 0], 'vibrate', 'tap'],
      'Human': [[255, 0, 0], 'shake']
    },
    numberOfDynamicTokens: 0,
    selectedToken: '',
    attributes: {
      LEDColor: '#00ff00',
      allowLEDChange: true,
      allowVibrate: true,
      allowTap: true,
      allowDoubleTap: true,
      allowShake: true,
      allowTilt: true,
      allowTurn: true,
      allowTokenToken: true
    }
  },

  mutations: {
    CHANGE_LED_COLOR (state, payload) {
      state.attributes.LEDColor = payload
    },
    UPDATE_TOKEN_ATTRIBUTE (state, payload) {
      console.log(state.attributes, payload, !state.attributes[payload])
      Vue.set(state.attributes, payload, !state.attributes[payload])
    },
    SUBMIT_TOKEN (state, payload) {
      insertIntoDict(state.savedTokens, state.name, payload)
    },
    // saving the token to the store
    ADD_NEW_TOKEN (state, payload) {
      // combining disallowed actions and LED color to one list.
      // LED color is always the first item
      let tokenData = [colorHexToRGB(payload.LEDColor)]

      // handling whether token will be created with a static name or a generic name.
      // if dynamic name is used, token will be named token+dynamicNumber, e.g. token1, token2, token3 etc.
      let name = 'token'
      if (!payload.dynamicName) {
        name += state.numberOfDynamicTokens
        state.numberOfDynamicTokens += 1
      } else {
        name = payload.name
      }
      // appending illegal actions for the token.
      // the end result will be on the format [[R, G, B], 'illegalAction1', illegalAction2']
      if (!state.attributes.allowLEDChange) {
        tokenData.push('ledon')
      }
      if (!state.attributes.allowVibrate) {
        tokenData.push('vibrate')
      }
      if (!state.attributes.allowTap) {
        tokenData.push('tap')
      }
      if (!state.attributes.allowDoubleTap) {
        tokenData.push('doubleTap')
      }
      if (!state.attributes.allowShake) {
        tokenData.push('shake')
      }
      if (!state.attributes.allowTilt) {
        tokenData.push('tilt')
      }
      if (!state.attributes.allowTurn) {
        tokenData.push('turn')
      }
      if (!state.attributes.allowTokenToken) {
        tokenData.push('tokenToken')
      }
      // inserting the new key-value pair into savedTokens.
      insertIntoDict(state.savedTokens, name, tokenData)
    },
    SELECT_TOKEN (state, tokenName) {
      state.selectedToken = tokenName
    }
  },

  actions: {
    changeLEDColor ({commit}, payload) {
      commit('CHANGE_LED_COLOR', payload)
    },
    updateBooleanAttributes ({commit}, payload) {
      console.log(payload)
      commit('UPDATE_TOKEN_ATTRIBUTE', payload)
    },
    // Selects a token for viewing/editing
    selectToken ({commit}, tokenName) {
      console.log('I am here!')
      console.log(tokenName)
      commit('SELECT_TOKEN', tokenName)
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
