import {fabric as F} from 'fabric'
import {createPolyPoints} from '../utilities/helpers.js'

export default {
  state: {
    canvas: null
  },

  mutations: {
    SET_CANVAS (state, payload) {
      state.canvas = payload
    },

    CREATE_RECT (state) {
      const rect = new F.Rect({
        width: 190,
        height: 190,
        fill: '#555555',
        stroke: '#ffd445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        minHeight: 190,
        minWidth: 190,
        name: 'NamedRect'
      })
      state.canvas.add(rect).setActiveObject(rect)
    },

    CREATE_POLYGON (state, sides) {
      const poly = new F.Polygon(createPolyPoints(sides, 100), {
        fill: '#555555',
        stroke: '#ffd445',
        strokeDashArray: [6, 1.5],
        strokeWidth: 2,
        minHeight: 173,
        minWidth: 200
      })
      state.canvas.add(poly).setActiveObject(poly)
    },

    CREATE_CIRCLE (state) {
      const circ = new F.Circle({
        radius: 100,
        fill: '#555555',
        stroke: '#ffd445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        minHeight: 200,
        minWidth: 200,
        name: 'NamedCirc'
      })
      state.canvas.add(circ).setActiveObject(circ)
    }
  },

  actions: {
    setCanvas ({commit}, payload) {
      commit('SET_CANVAS', payload)
    },
    createShape ({commit}, type) {
      switch (type) {
        case 'rect':
          commit('CREATE_RECT')
          break
        case 'triangle':
          commit('CREATE_POLYGON', 3)
          break
        case 'circle':
          commit('CREATE_CIRCLE')
          break
      }
    }
  },
  getters: {}
}
