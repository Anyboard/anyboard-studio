/**
 * Created by Magda Angelica on 05-Apr-17.
 */

export default {
  namespaced: true,
  state: {start_sector: 'Start sector:', mid_sector: 'Mid sector:', end_sector: 'End sector: ', activeColor: '', height: 'Height: ', width: 'Width: ', type: 'Type: ', fill: 'Color: ', name: 'Name: ', stroke: 'Stroke: ', strokedasharray: 'StrokeDashArray: ', strokewidth: 'StrokeWidth: ', minwidth: 'MinWidth: ', minheight: 'MinHeight'},
  mutations: {
    SET_PREDEFINED_SECTORS (state, payload) {
      state.start_sector = payload
      var templist = []
      var templist2 = []
      for (var key in payload) {
        templist.push(key)
        templist2.push(payload[key])
      }
      state.start_sector = templist[0] + ': ' + templist2[0]
      state.mid_sector = templist[1] + ': ' + templist2[1]
      state.end_sector = templist[2] + ': ' + templist2[2]
    },

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
    },
    SET_PROPER_COLOR (state, payload) {
      state.activecolor = payload
    }
  },
  actions: {
    setPredefinedSectors ({commit}, keys) {
      commit('SET_PREDEFINED_SECTORS', keys)
    },
    colorConverter (activeObj) {
      if (activeObj !== null) {
        if (activeObj.fill === '166CA0') {
          return 'Blue'
        }
      }
    },
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
          commit('SET_FILL', '')
          commit('SET_STROKE', '')
          commit('SET_STROKE_DASH_ARRAY', '')
          commit('SET_WIDTH', '')
          commit('SET_MIN_WIDTH', '')
          commit('SET_MIN_HEIGHT', '')
        } else if (activeObj.type === 'path') {
          commit('SET_NAME', 'Name: ' + activeObj.name)
          commit('SET_TYPE', 'Type: ' + activeObj.type)
          commit('SET_FILL', 'Color: ' + activeObj.stroke)
          commit('SET_HEIGHT', '')
          commit('SET_WIDTH', '')
          commit('SET_STROKE', '')
          commit('SET_STROKE_DASH_ARRAY', '')
          commit('SET_STROKE_WIDTH', '')
          commit('SET_MIN_WIDTH', '')
          commit('SET_MIN_HEIGHT', '')
        } else if (activeObj.type === 'i-text') {
          commit('SET_NAME', 'Name: ' + activeObj.text)
          commit('SET_TYPE', 'Type: ' + activeObj.type)
          commit('SET_FILL', 'Color: ' + activeObj.fill)
          commit('SET_HEIGHT', 'Height: ' + activeObj.height * activeObj.scaleY)
          commit('SET_WIDTH', 'Width: ' + activeObj.width * activeObj.scaleX)
          commit('SET_STROKE', 'Stroke: ' + activeObj.stroke)
          commit('SET_STROKE_DASH_ARRAY', '')
          commit('SET_STROKE_WIDTH', '')
          commit('SET_MIN_WIDTH', '')
          commit('SET_MIN_HEIGHT', '')
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
