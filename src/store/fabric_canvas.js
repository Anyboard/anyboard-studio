import {fabric as F} from 'fabric'

export default {
  state: {canvas: null},
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
      this.canvas.add(rect).setActiveObject(rect)
      this.canvas.getActiveObject().render()
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
      }
    }
  },
  getters: {}
}
