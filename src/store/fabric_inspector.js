/**
 * Created by Magda Angelica on 05-Apr-17.
 */

export default {
  namespaced: true,
  state: {height: 'Height: ', width: 'Width: ', type: 'Type: ', fill: 'Color: ', name: 'Name: ', stroke: 'Stroke: ', strokedasharray: 'StrokeDashArray: ', strokewidth: 'StrokeWidth: ', minwidth: 'MinWidth: ', minheight: 'MinHeight'},
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
    SET_MIN_WIDTH (state, payload) {
      state.minwidth = payload
    },
    SET_MIN_HEIGHT (state, payload) {
      state.minheight = payload
    }

  },
  actions: {
    updateInfo ({commit}, activeObj) {
      if (activeObj !== null) {
        if (activeObj.type === 'rect' || activeObj.type === 'circle' || activeObj.type === 'polygon') {
          commit('SET_NAME', 'Name: ' + activeObj.name)
          commit('SET_TYPE', 'Type: ' + activeObj.type)
          commit('SET_HEIGHT', 'Height: ' + activeObj.height * activeObj.scaleY)
          commit('SET_WIDTH', 'Width: ' + activeObj.width * activeObj.scaleX)
          commit('SET_FILL', 'Color: ' + activeObj.fill)
          commit('SET_STROKE', 'Stroke: ' + activeObj.stroke)
          commit('SET_STROKE_DASH_ARRAY', 'StrokeDashArray: ' + activeObj.strokeDashArray)
          commit('SET_STROKE_WIDTH', 'StrokeWidth: ' + activeObj.strokeWidth)
          commit('SET_MIN_WIDTH', 'MinWidth: ' + activeObj.minWidth)
          commit('SET_MIN_HEIGHT', 'MinHeight: ' + activeObj.minHeight)
        } else if (activeObj.type === 'image') {
          commit('SET_NAME', 'Name: ' + activeObj.name)
          commit('SET_TYPE', 'Type: ' + activeObj.type)
          commit('SET_HEIGHT', 'Height: ' + activeObj.height * activeObj.scaleY)
          commit('SET_WIDTH', 'Width: ' + activeObj.width * activeObj.scaleX)
          commit('SET_FILL', 'Color: ')
          commit('SET_STROKE', 'Stroke: ')
          commit('SET_STROKE_DASH_ARRAY', 'StrokeDashArray: ')
          commit('SET_WIDTH', 'StrokeWidth: ')
          commit('SET_MIN_WIDTH', 'MinWidth: ')
          commit('SET_MIN_HEIGHT', 'MinHeight: ')
        } else if (activeObj.type === 'path') {
          commit('SET_NAME', 'Name: ' + activeObj.name)
          commit('SET_TYPE', 'Type: ' + activeObj.type)
          commit('SET_FILL', 'Color: ' + activeObj.stroke)
          commit('SET_HEIGHT', 'Height: ')
          commit('SET_WIDTH', 'Width: ')
          commit('SET_STROKE', 'Stroke: ')
          commit('SET_STROKE_DASH_ARRAY', 'StrokeDashArray: ')
          commit('SET_STROKE_WIDTH', 'StrokeWidth: ')
          commit('SET_MIN_WIDTH', 'MinWidth: ')
          commit('SET_MIN_HEIGHT', 'MinHeight: ')
        }
      }
    },
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
    setMinWidth ({commit}, para) {
      commit('SET_MIN_WIDTH', para)
    },
    setMinHeight ({commit}, para) {
      commit('SET_MIN_HEIGHT', para)
    }
  },
  getters: {}
}
