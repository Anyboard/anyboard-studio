/**
 * Created by Magda Angelica on 05-Apr-17.
 */

export default {
  namespaced: true,
  state: {height: 'Height: ', width: 'Width: ', type: 'Type: ', fill: 'Fill: ', name: 'Name: ', stroke: 'Stroke: ', strokedasharray: 'StrokeDashArray: ', strokewidth: 'StrokeWidth: ', maxheight: 'MaxHeight: ', minheight: 'MinHeight'},
  mutations: {
    SET_HEIGHT (state, payload) {
      state.height = payload
    },
    SET_WIDTH (state, payload) {
      state.width = payload
    },
    SET_TYPE (state, payload) {
      state.type = payload
    },
    SET_FILL (state, payload) {
      state.fill = payload
    },
    SET_NAME (state, payload) {
      state.name = payload
    },
    SET_STROKE (state, payload) {
      state.stroke = payload
    },
    SET_STROKE_DASH_ARRAY (state, payload) {
      state.strokedasharray = payload
    },
    SET_STROKE_WIDTH (state, payload) {
      state.strokewidth = payload
    },
    SET_MAX_HEIGHT (state, payload) {
      state.maxheight = payload
    },
    SET_MIN_HEIGHT (state, payload) {
      state.minheight = payload
    }

  },
  actions: {
    setHeight ({commit}, para) {
      commit('SET_HEIGHT', para)
    },
    setWidth ({commit}, para) {
      commit('SET_WIDTH', para)
    },
    setType ({commit}, para) {
      commit('SET_TYPE', para)
    },
    setFill ({commit}, para) {
      commit('SET_FILL', para)
    },
    setName ({commit}, para) {
      commit('SET_NAME', para)
    },
    setStroke ({commit}, para) {
      commit('SET_STROKE', para)
    },
    setStrokeDashArray ({commit}, para) {
      commit('SET_STROKE_DASH_ARRAY', para)
    },
    setStrokeWidth ({commit}, para) {
      commit('SET_STROKE_WIDTH', para)
    },
    setMaxHeight ({commit}, para) {
      commit('SET_MAX_HEIGHT', para)
    },
    setMinHeight ({commit}, para) {
      commit('SET_MIN_HEIGHT', para)
    }
  },
  getters: {}
}
