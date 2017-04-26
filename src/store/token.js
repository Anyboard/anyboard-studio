/**
 * Created by Kriestian Spanck on 25.04.2017.
 */
import {insertIntoDict, colorHexToRGB} from '../utilities/helpers.js'

export default {
  namespaced: true,
  state: {
    savedTokens: {},
    numberOfDynamicTokens: 0,
    nameType: 'static',
    name: '',
    LEDAllowed: false,
    Vibrate: false,
    Tap: false,
    DoubleTap: false,
    Shake: false,
    Tilt: false,
    Turn: false,
    Tokentoken: false
  },
  mutations: {
    INVERT_NAME_TYPE (state) {
      switch (state.nameType) {
        case 'dynamic':
          state.nameType = 'static'
          break
        case 'static':
          state.nameType = 'dynamic'
          break
      }
    },
    INVERT_LED_ALLOWED (state) {
      state.LEDAllowed = !state.LEDAllowed
    },
    INVERT_VIBRATE (state) {
      state.Vibrate = !state.Vibrate
    },
    INVERT_TAP (state) {
      state.Tap = !state.Tap
    },
    INVERT_DOUBLE_TAP (state) {
      state.DoubleTap = !state.DoubleTap
    },
    INVERT_SHAKE (state) {
      state.Shake = !state.Shake
    },
    INVERT_TILT (state) {
      state.Tilt = !state.Tilt
    },
    INVERT_TURN (state) {
      state.Turn = !state.Turn
    },
    INVERT_TOKENTOKEN (state) {
      state.Tokentoken = !state.Tokentoken
    },
    SUBMIT_TOKEN (state, payload) {
      console.log(payload)
      let tokenData = [colorHexToRGB(payload[0])]
      if (state.nameType === 'dynamic') {
        state.numberOfDynamicTokens += 1
        state.name = 'token' + state.numberOfDynamicTokens
      } else if (state.nameType === 'static') {
        state.name = payload[1]
      } else {
        console.log('THIS SHOULDNT BE REACHABLE')
      }
      if (!state.Vibrate) {
        tokenData.push('Vibrate')
      }
      if (!state.LEDAllowed) {
        tokenData.push('LED')
      }
      if (!state.Tap) {
        tokenData.push('Tap')
      }
      if (!state.DoubleTap) {
        tokenData.push('DoubleTap')
      }
      if (!state.Shake) {
        tokenData.push('Shake')
      }
      if (!state.Tilt) {
        tokenData.push('Tilt')
      }
      if (!state.Turn) {
        tokenData.push('Turn')
      }
      if (!state.Tokentoken) {
        tokenData.push('TokenToken')
      }
      insertIntoDict(state.savedTokens, state.name, tokenData)
    }
  },
  actions: {
    updateNameType ({commit}) {
      commit('INVERT_NAME_TYPE')
    },
    updateLEDAllowed ({commit}) {
      commit('INVERT_LED_ALLOWED')
    },
    updateVibrate ({commit}) {
      commit('INVERT_VIBRATE')
    },
    updateTap ({commit}) {
      commit('INVERT_TAP')
    },
    updateDtap ({commit}) {
      commit('INVERT_DOUBLE_TAP')
    },
    updateShake ({commit}) {
      commit('INVERT_SHAKE')
    },
    updateTilt ({commit}) {
      commit('INVERT_TILT')
    },
    updateTurn ({commit}) {
      commit('INVERT_TURN')
    },
    updateTokentoken ({commit}) {
      commit('INVERT_TOKENTOKEN')
    },
    submitToken ({commit}, payload) {
      commit('SUBMIT_TOKEN', payload)
    }
  },
  getters: {
    GET_SAVEDTOKENS: state => {
      return state.savedTokens
    }
  }
}
