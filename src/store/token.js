/**
 * Created by Kriestian Spanck on 25.04.2017.
 */
import {insertIntoDict, colorHexToRGB} from '../utilities/helpers.js'

export default {
  namespaced: true,

  state: {
    savedTokens: {
      'Dragon': [[0, 255, 0], 'vibrate', 'tap'],
      'Human': [[255, 0, 0], 'shake']
    },
    defaultLEDColor: '#00ff00',
    allowVibrate: true,
    allowLEDChange: true,
    allowTap: true,
    allowDoubleTap: true,
    allowShake: true,
    allowTilt: true,
    allowTurn: true,
    allowTokenToken: true,
    disableButton: true,
    numberOfDynamicTokens: 0,
    selectedToken: ''
  },

  mutations: {
    SUBMIT_TOKEN (state, payload) {
      insertIntoDict(state.savedTokens, state.name, payload)
    },
    // saving the token to the store
    ADD_NEW_TOKEN (state, payload) {
      // combining disallowed actions and LED color to one list.
      // LED color is always the first item
      let tokenData = [colorHexToRGB(payload.LEDColor)]
      for (let i = 0; i < payload.illegalActions.length; i++) {
        tokenData.push(payload.illegalActions[i])
      }
      // handling whether token will be created with a static name or a generic name.
      let name = 'token'
      if (!payload.dynamicName) {
        name += state.numberOfDynamicTokens
        state.numberOfDynamicTokens += 1
      } else {
        name = payload.name
      }

      insertIntoDict(state.savedTokens, name, tokenData)
    },

    SELECT_TOKEN (state, tokenName) {
      state.selectedToken = tokenName
    }
  },

  actions: {
    saveToken ({commit}, payload) {
      commit('ADD_NEW_TOKEN', payload)
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
