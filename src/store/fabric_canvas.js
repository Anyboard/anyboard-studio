import {fabric as F} from 'fabric'
import FileSaver from 'file-saver'
import {createPolyPoints, dataURLtoBlob} from '../utilities/helpers.js'

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
        width: 200,
        height: 200,
        fill: '#555555',
        stroke: '#ffd445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        minHeight: 200,
        minWidth: 200,
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
        minHeight: 200,
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
    },

    INSERT_TEXT (state) {
      const text = new F.IText('InsertedText',
        {
          fill: '#ffffff',
          stroke: '#000000',
          strokeWidth: 1,
          fontFamily: 'Arial',
          fontSize: 30,
          textAlign: 'center'
        })
      state.canvas.add(text)
      state.canvas.setActiveObject(text)
    },

    DELETE_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.getActiveObject().remove()
      }
    },

    CLONE_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        var copyData = state.canvas.getActiveObject().toObject()
        F.util.enlivenObjects([copyData], function (objects) {
          objects.forEach(function (o) {
            o.set('top', o.top + 15)
            o.set('left', o.left + 15)
            state.canvas.add(o)
          })
          state.canvas.renderAll()
        })
      }
    },

    CENTER_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.getActiveObject().center()
        state.canvas.getActiveObject().setCoords()
      }
    },

    BRING_FORWARD (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.bringForward(state.canvas.getActiveObject())
      }
    },
    SEND_BACKWARD (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.sendBackwards(state.canvas.getActiveObject())
      }
    },
    BRING_TO_FRONT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.bringToFront(state.canvas.getActiveObject())
      }
    },
    SEND_TO_BACK (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.sendToBack(state.canvas.getActiveObject())
      }
    },

    UPLOAD_IMAGE (state, file) {
      console.log(file)
      let reader = new FileReader()
      reader.onload = function (f) {
        const data = f.target.result
        F.Image.fromURL(data, function (img) {
          const oImg = img.set({angle: 0}).scale(0.5)
          state.canvas.add(oImg).renderAll()
          state.canvas.setActiveObject(oImg)
          state.canvas.toDataURL({format: 'png', quality: 0.8})
        })
      }
      reader.readAsDataURL(file)
    },

    SAVE_BOARD (state) {
      if (state.canvas.getObjects().length > 0) {
        state.canvas.deactivateAll().renderAll()
        const img = state.canvas.toDataURL('png')
        const blob = dataURLtoBlob(img)
        FileSaver.saveAs(blob, 'Board.png')
      }
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
    },
    insertText ({commit}, payload) {
      commit('INSERT_TEXT', payload)
    },
    deleteObject ({commit}, payload) {
      commit('DELETE_OBJECT', payload)
    },
    cloneObject ({commit}, payload) {
      commit('CLONE_OBJECT', payload)
    },
    centerObject ({commit}, payload) {
      commit('CENTER_OBJECT', payload)
    },
    arrangeObject ({commit}, type) {
      switch (type) {
        case 'forward':
          commit('BRING_FORWARD')
          break
        case 'backward':
          commit('SEND_BACKWARD')
          break
        case 'front':
          commit('BRING_TO_FRONT')
          break
        case 'back':
          commit('SEND_TO_BACK')
          break
      }
    },
    uploadImage ({commit}, file) {
      commit('UPLOAD_IMAGE', file)
    },
    saveBoard ({commit}, payload) {
      commit('SAVE_BOARD', payload)
    }
  },
  getters: {}
}
