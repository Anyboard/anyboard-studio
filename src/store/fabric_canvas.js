import {fabric as F} from 'fabric'
import FileSaver from 'file-saver'
import {createPolyPoints, dataURLtoBlob, layerify, exportSectors, updateSectorList} from '../utilities/helpers.js'

export default {
  state: {
    canvas: null,
    canvasState: 0,
    sectors: {},
    usedSectors: {}
  },

  mutations: {
    // Setup
    SET_CANVAS (state, payload) {
      state.canvas = payload
    },

    INIT_DRAW (state) {
      state.canvas.freeDrawingBrush = new F['PencilBrush'](state.canvas)
      state.canvas.freeDrawingBrush.width = 20
      state.canvas.freeDrawingBrush.color = '#000000'
    },

    // Creating Sectors
    CREATE_RECT (state) {
      const rect = new F.Rect({
        width: 200,
        height: 200,
        fill: '#C047A3',
        stroke: '#ffd445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        minHeight: 200,
        minWidth: 200,
        name: 'NamedRect'
      })
      layerify(state.canvas)
      state.canvas.add(rect).setActiveObject(rect)
    },

    CREATE_POLYGON (state, sides) {
      const poly = new F.Polygon(createPolyPoints(sides, 100), {
        fill: '#C047A3',
        stroke: '#ffd445',
        strokeDashArray: [6, 1.5],
        strokeWidth: 2,
        minHeight: 200,
        minWidth: 200
      })
      layerify(state.canvas)
      state.canvas.add(poly).setActiveObject(poly)
    },

    CREATE_CIRCLE (state) {
      const circ = new F.Circle({
        radius: 100,
        fill: '#C047A3',
        stroke: '#ffd445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        minHeight: 200,
        minWidth: 200,
        name: 'NamedCirc'
      })
      layerify(state.canvas)
      state.canvas.add(circ).setActiveObject(circ)
    },

    // Inserting text
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
      layerify(state.canvas)
      state.canvas.setActiveObject(text)
    },

    // Free drawing
    TOGGLE_DRAW (state) {
      state.canvas.isDrawingMode = !state.canvas.isDrawingMode
      if (state.canvas.isDrawingMode) {
        layerify(state.canvas)
      } else {
        layerify(state.canvas)
      }
    },
    // Object manipulation
    DELETE_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.getActiveObject().remove()
        layerify(state.canvas)
      }
    },

    // BUG: Paths aren't cloned
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
        layerify(state.canvas)
      }
    },

    CENTER_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.getActiveObject().center()
        state.canvas.getActiveObject().setCoords()
        layerify(state.canvas)
      }
    },

    BRING_FORWARD (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.bringForward(state.canvas.getActiveObject())
        layerify(state.canvas)
      }
    },
    SEND_BACKWARD (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.sendBackwards(state.canvas.getActiveObject())
        layerify(state.canvas)
      }
    },
    BRING_TO_FRONT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.bringToFront(state.canvas.getActiveObject())
        layerify(state.canvas)
      }
    },
    SEND_TO_BACK (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.sendToBack(state.canvas.getActiveObject())
        layerify(state.canvas)
      }
    },

    // Image handling
    UPLOAD_IMAGE (state, file) {
      let reader = new FileReader()
      reader.onload = function (f) {
        const data = f.target.result
        F.Image.fromURL(data, function (img) {
          const oImg = img.set({angle: 0}).scale(0.5)
          state.canvas.add(oImg).renderAll()
          state.canvas.setActiveObject(oImg)
          state.canvas.toDataURL({format: 'png', quality: 0.8})
          layerify(state.canvas)
        })
      }
      reader.readAsDataURL(file)
    },

    // Exporting
    SAVE_BOARD (state) {
      if (state.canvas.getObjects().length > 0) {
        layerify(state.canvas)
        state.canvas.deactivateAll().renderAll()
        const img = state.canvas.toDataURL('png')
        const blob = dataURLtoBlob(img)
        FileSaver.saveAs(blob, 'Board.png')
      }
    },

    SAVE_STATE (state) {
      state.canvasState = state.canvas.toDatalessJSON(['name'])
    },

    LOAD_STATE (state) {
      if (state.canvasState !== 0) {
        state.canvas.loadFromDatalessJSON(state.canvasState)
      }
    },

    SAVE_SECTORS (state) {
      state.sectors = exportSectors(state.canvas)
    },

    USED_SECTORS (state) {
      state.usedSectors = updateSectorList(state.canvas)
    },

    // Debugging
    JSON_DEBUG (state) {
      console.log(JSON.stringify(state.canvas))
    }
  },

  actions: {
    // Setup
    setCanvas ({commit}, payload) {
      commit('SET_CANVAS', payload)
      commit('INIT_DRAW')
      commit('LOAD_STATE')
      commit('SAVE_STATE')
      commit('LOAD_STATE')
      commit('USED_SECTORS')
    },

    // Sector creation
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

    // Text
    insertText ({commit}, payload) {
      commit('INSERT_TEXT', payload)
    },

    // Free drawing
    toggleDraw ({commit}, payload) {
      commit('TOGGLE_DRAW', payload)
    },
    // Object manipulation
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

    // Image handling
    uploadImage ({commit}, file) {
      commit('UPLOAD_IMAGE', file)
    },

    // Exporting
    saveBoard ({commit}, payload) {
      commit('SAVE_BOARD', payload)
    },

    stateHandling ({commit}) {
      commit('SAVE_STATE')
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
    },

    loadState ({commit}) {
      commit('LOAD_STATE')
    },

    // Debugging
    jsonDebug ({commit}) {
      commit('JSON_DEBUG')
    }
  },
  getters: {}
}
