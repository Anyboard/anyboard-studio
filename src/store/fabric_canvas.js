import {fabric as F} from 'fabric'
import FileSaver from 'file-saver'
// import createObjectURL from 'create-object-url'
import {createPolyPoints, dataURLtoBlob, layerify, exportSectors, updateSectorList,
        renameSameSector, colorChange, renameSector, checkIfSameName, getColorName} from '../utilities/helpers.js'

export default {
  state: {
    canvas: null,
    canvasState: 0,
    sectors: {},
    usedSectors: {},
    sectorColor: '#166CA0',
    drawLayer: 'bottom',
    minSize: 200,
    activeObj: null,
    gridActive: true,
    gridAdded: false,
    gridSize: 50,
    printableBoard: null
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
    CREATE_RECT (state, color) {
      const rect = new F.Rect({
        width: state.minSize,
        height: state.minSize,
        fill: color,
        stroke: '#FFD445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        name: getColorName(color)
      })
      layerify(state.canvas)
      renameSameSector(rect, state.canvas)
      state.canvas.add(rect).setActiveObject(rect)
    },

    CREATE_POLYGON (state, properties) {
      const poly = new F.Polygon(createPolyPoints(properties.sides, state.minSize / 2), {
        fill: properties.color,
        stroke: '#FFD445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        name: getColorName(properties.color)
      })
      layerify(state.canvas)
      renameSameSector(poly, state.canvas)
      state.canvas.add(poly).setActiveObject(poly)
    },

    CREATE_CIRCLE (state, color) {
      const circ = new F.Circle({
        radius: state.minSize / 2,
        fill: color,
        stroke: '#FFD445',
        strokeDashArray: [15, 3],
        strokeWidth: 7,
        name: getColorName(color)
      })
      layerify(state.canvas)
      renameSameSector(circ, state.canvas)
      state.canvas.add(circ).setActiveObject(circ)
    },

    UPDATE_COLOR (state, payload) {
      state.sectorColor = payload
    },

    CHANGE_COLOR (state) {
      colorChange(state.canvas, state.sectorColor)
    },

    RENAME_SECTOR (state, payload) {
      if (!checkIfSameName(payload, state.usedSectors, state.activeObj)) {
        renameSector(state.canvas, payload)
      }
    },
    // Inserting text
    INSERT_TEXT (state) {
      const text = new F.IText('InsertedText',
        {
          fill: '#FFFFFF',
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

    // Change brush width
    CHANGE_WIDTH (state, payload) {
      state.canvas.freeDrawingBrush.width = parseInt(payload || 1)
    },

    CHANGE_DRAW_COLOR (state, payload) {
      state.canvas.freeDrawingBrush.color = payload
    },

    // Change draw layer
    CHANGE_DRAW_LAYER (state) {
      if (state.drawLayer === 'bottom') {
        state.drawLayer = 'top'
      } else if (state.drawLayer === 'top') {
        state.drawLayer = 'bottom'
      }
    },

    // Object manipulation
    DELETE_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        state.canvas.getActiveObject().remove()
        layerify(state.canvas)
      }
    },

    CLEAR_CANVAS (state) {
      state.canvas.clear()
      state.canvas.setBackgroundColor('white')
      state.canvas.renderAll()
      state.gridAdded = false
    },

    CLONE_OBJECT (state) {
      if (state.canvas.getActiveObject() != null) {
        const obj = state.canvas.getActiveObject()
        if (F.util.getKlass(obj.type).async) {
          obj.clone(function (clone) {
            clone.set({left: obj.left + 15, top: obj.top + 15, name: obj.name})
            state.canvas.add(clone)
          })
        } else {
          state.canvas.add(obj.clone().set({left: obj.left + 15, top: obj.top + 15, name: obj.name}))
        }
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
        const fileName = file.name.substring(0, file.name.indexOf('.'))
        F.Image.fromURL(data, function (img) {
          const oImg = img.set({angle: 0}).scale(0.5)
          oImg.name = fileName
          state.canvas.add(oImg).renderAll()
          state.canvas.setActiveObject(oImg)
          state.canvas.toDataURL({format: 'png', quality: 0.8})
          layerify(state.canvas)
        })
      }
      reader.readAsDataURL(file)
    },

    // Exporting
    UPDATE_ACTIVEOBJ (state) {
      const obj = state.canvas.getActiveObject()
      state.activeObj = null
      if (obj !== null && typeof obj !== 'undefined') {
        state.activeObj = obj.toObject(['name', 'pathName'])
      } else {
        state.activeObj = null
      }
    },
    SAVE_BOARD (state) {
      if (state.gridActive) {
        const objs = state.canvas.getObjects()
        for (let i = 0, l = objs.length; i < l; ++i) {
          if (objs[i]['type'] === 'line') {
            objs[i]['opacity'] = 0
          }
        }
      }

      if (state.canvas.getObjects().length > 0) {
        layerify(state.canvas)
        state.canvas.deactivateAll().renderAll()
        const img = state.canvas.toDataURL('png')
        const blob = dataURLtoBlob(img)
        FileSaver.saveAs(blob, 'Board.png')
      }

      const objs = state.canvas.getObjects()
      for (let i = 0, l = objs.length; i < l; ++i) {
        if (objs[i]['type'] === 'line') {
          objs[i]['opacity'] = state.gridActive
        }
      }
      state.canvas.renderAll()
    },

    MAKE_PRINTABLE_BOARD (state) {
      if (state.gridActive) {
        const objs = state.canvas.getObjects()
        for (let i = 0, l = objs.length; i < l; ++i) {
          if (objs[i]['type'] === 'line') {
            objs[i]['opacity'] = 0
          }
        }
      }

      if (state.canvas.getObjects().length > 0) {
        state.canvas.deactivateAll().renderAll()
        state.printableBoard = state.canvas.toDataURL('png')
      }

      const objs = state.canvas.getObjects()
      for (let i = 0, l = objs.length; i < l; ++i) {
        if (objs[i]['type'] === 'line') {
          objs[i]['opacity'] = state.gridActive
        }
      }
      state.canvas.renderAll()
    },

    DOWNLOAD_BOARD (state) {
      if (state.canvas.getObjects().length > 0) {
        const blob = new Blob([JSON.stringify(state.canvasState)], {type: 'text/plain;charset=utf-8'})
        FileSaver.saveAs(blob, 'BFoard.json')
      }
    },

    UPLOAD_BOARD (state, payload) {
      state.canvasState = payload
    },

    SAVE_STATE (state) {
      state.canvasState = state.canvas.toDatalessJSON(['name', 'pathName', 'selectable', 'opacity'])
    },

    LOAD_STATE (state) {
      if (state.canvasState !== 0) {
        state.canvas.loadFromDatalessJSON(state.canvasState)
        state.canvas.setBackgroundColor('white')
      }
    },

    SAVE_SECTORS (state) {
      state.sectors = exportSectors(state.canvas)
    },

    USED_SECTORS (state) {
      state.usedSectors = updateSectorList(state.canvas)
    },

    CHANGE_GRID_MODE (state) {
      state.gridActive = !state.gridActive
    },

    HANDLE_DRAW_GRID (state) {
      const objs = state.canvas.getObjects()
      for (let i = 0, l = objs.length; i < l; ++i) {
        if (objs[i]['type'] === 'line') {
          objs[i]['opacity'] = state.gridActive
        }
      }
      state.canvas.renderAll()
    },

    CHANGE_GRID_SIZE (state, payload) {
      state.gridSize = payload
    },

    REMOVE_GRID (state) {
      const objs = state.canvas.getObjects()
      let toBeRemoved = []
      for (let i = 0, l = objs.length; i < l; ++i) {
        if (objs[i]['type'] === 'line') {
          toBeRemoved.push(objs[i])
        }
      }
      for (let i in toBeRemoved) {
        state.canvas.remove(toBeRemoved[i])
      }
    },

    ADD_GRID (state) {
      const canvasWidth = state.canvas.width
      if (!state.gridAdded) {
        for (let i = 0; i < (canvasWidth / state.gridSize); i++) {
          state.canvas.add(new F.Line([i * state.gridSize, 0, i * state.gridSize, canvasWidth],
            { stroke: '#ccc', selectable: false, id: 'grid1' }))
          state.canvas.add(new F.Line([0, i * state.gridSize, canvasWidth, i * state.gridSize],
            { stroke: '#ccc', selectable: false, id: 'grid2' }))
        }
        state.gridAdded = true
        state.canvas.renderAll()
        layerify(state.canvas)
      }
    },

    UNADD_GRID (state) {
      state.gridAdded = false
    },

    // Debugging
    JSON_DEBUG (state) {
      console.log(JSON.stringify(state.canvas.getObjects()))
    }
  },

  actions: {
    // Setup
    setCanvas ({commit}, payload) {
      commit('SET_CANVAS', payload)
      commit('INIT_DRAW')
      commit('LOAD_STATE')
      commit('SAVE_STATE')
      commit('ADD_GRID')
      commit('HANDLE_DRAW_GRID')
      commit('USED_SECTORS')
    },

    // Sector creation
    createShape ({commit, state}, type) {
      console.log(type)
      switch (type) {
        case 'rect':
          commit('CREATE_RECT', state.sectorColor.toUpperCase())
          break
        case 'triangle':
          commit('CREATE_POLYGON', {color: state.sectorColor.toUpperCase(), sides: 3})
          break
        case 'circle':
          commit('CREATE_CIRCLE', state.sectorColor.toUpperCase())
          break
      }
    },

    updateColor ({commit, getters, dispatch}, color) {
      commit('UPDATE_COLOR', color)
      const obj = getters.GET_ACTIVEOBJ
      if (obj !== null && (['rect', 'polygon', 'circle', 'path'].includes(obj.type))) {
        dispatch('changeColor')
      }
      commit('CHANGE_DRAW_COLOR', color)
    },

    updateColorSectorList ({commit}, color) {
      commit('UPDATE_COLOR', color)
    },

    renameSector ({commit}, name) {
      commit('RENAME_SECTOR', name)
      commit('UPDATE_ACTIVEOBJ')
      commit('SAVE_STATE')
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
    },
    changeColor ({commit}) {
      commit('CHANGE_COLOR')
      commit('SAVE_STATE')
      commit('LOAD_STATE')
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
    },
    // Text
    insertText ({commit}) {
      commit('INSERT_TEXT')
    },

    // Free drawing
    toggleDraw ({commit}, payload) {
      commit('TOGGLE_DRAW', payload)
    },

    changeWidth ({commit}, width) {
      commit('CHANGE_WIDTH', width)
    },

    changeDrawLayer ({commit}) {
      commit('CHANGE_DRAW_LAYER')
    },

    changeDrawColor ({commit}, color) {
      commit('CHANGE_DRAW_COLOR', color)
    },

    // Object manipulation
    deleteObject ({commit}) {
      commit('DELETE_OBJECT')
    },

    clearCanvas ({commit}) {
      commit('CLEAR_CANVAS')
      commit('ADD_GRID')
      commit('HANDLE_DRAW_GRID')
      commit('SAVE_STATE')
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
      commit('LOAD_STATE')
    },

    cloneObject ({commit}) {
      commit('CLONE_OBJECT')
    },
    centerObject ({commit}) {
      commit('CENTER_OBJECT')
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
    updateActiveObj ({commit}) {
      commit('UPDATE_ACTIVEOBJ')
    },
    saveBoard ({commit}) {
      commit('SAVE_BOARD')
    },

    makePrintableBoard ({commit}) {
      commit('MAKE_PRINTABLE_BOARD')
    },

    downloadBoard ({commit}) {
      commit('DOWNLOAD_BOARD')
    },

    uploadBoard ({commit}, board) {
      commit('UPLOAD_BOARD', board)
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
      commit('LOAD_STATE')
      commit('HANDLE_DRAW_GRID')
    },

    stateHandling ({commit}) {
      commit('SAVE_STATE')
      commit('USED_SECTORS')
      commit('SAVE_SECTORS')
    },

    loadState ({commit}) {
      commit('LOAD_STATE')
      commit('HANDLE_DRAW_GRID')
    },

    changeGridMode ({commit}) {
      commit('CHANGE_GRID_MODE')
      commit('HANDLE_DRAW_GRID')
    },

    updateGridSize ({commit}, size) {
      commit('CHANGE_GRID_SIZE', size)
    },

    changeGridSize ({commit}, size) {
      commit('UNADD_GRID')
      commit('REMOVE_GRID')
      commit('CHANGE_GRID_SIZE', size)
      commit('ADD_GRID')
      commit('HANDLE_DRAW_GRID')
    },

    // Debugging
    jsonDebug ({commit}) {
      commit('JSON_DEBUG')
    }
  },
  getters: {
    GET_DRAW_LAYER: state => {
      return state.drawLayer
    },
    GET_ACTIVEOBJ: state => {
      return state.activeObj
    },

    GET_SECTORS: state => {
      return state.sectors
    },

    GET_USED_SECTORS: state => {
      return state.usedSectors
    },
    GET_GRIDMODE: state => {
      return state.gridActive
    },
    GET_GRIDSIZE: state => {
      return state.gridSize
    },
    GET_GRIDADDED: state => {
      return state.gridAdded
    },
    GET_PRINTABLE_BOARD: state => {
      return state.printableBoard
    }
  }
}
