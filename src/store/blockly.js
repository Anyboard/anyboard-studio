import Blockly from 'node-blockly/browser'
import toolbox from '../utilities/blockly-toolbox.js'
import htmlTemplate from '../utilities/html-template'
import blocklyInit from '../utilities/blockly-init.js'
import FileSaver from 'file-saver'
import {makeZip} from '../utilities/helpers.js'

export default {
  namespaced: true,

  state: {
    workspace: null,
    blocklyState: 0,
    exportedCode: null
  },

  mutations: {
    SET_WORKSPACE (state, workspace) {
      state.workspace = workspace
    },
    SAVE_BLOCKLY_STATE: function (state, blocklyState) {
      state.blocklyState = blocklyState
    },
    EXPORT_CODE (state) {
      // Converts the blockly code on screen to useable javascript code and pushes it into the index.html
      const done = htmlTemplate.replace('//REPLACEMEOKAY//\n', Blockly.JavaScript.workspaceToCode(state.workspace))
      let blob = new Blob([done], {
        type: 'text/html'
      })
      makeZip(blob) // Doesn't download the files from github as exact copies, which causes issues
      // FileSaver.saveAs(blob, 'index.html')
    },
    DOWNLOAD_CODE (state) {
      if (state.blocklyState !== 0) {
        const blob = new Blob([state.blocklyState], {type: 'text/plain;charset=utf-8'})
        FileSaver.saveAs(blob, 'code.xml')
      }
    },
    UPLOAD_CODE (state, code) {
      state.blocklyState = code
    }
  },
  getters: {
    GET_BLOCKLY_STATE: state => {
      return state.blocklyState
    }
  },

  actions: {
    blocklyInit: function (context) {
      let commit = context.commit
      let rootGetters = context.rootGetters
      const toMatrix = (arr, width) =>
      arr.reduce((rows, key, index) => (index % width === -0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, [])

      let sectorObject = rootGetters.GET_SECTORS
      let tokenVal = rootGetters['token/GET_SAVEDTOKENS']
      let ledGrids = rootGetters['ledgrid/GET_SAVEDLEDGRIDS']
      let sectorNames = toMatrix(Object.keys(sectorObject), 1)  // used tilesnames for dropdown
      if (sectorNames.length === 0) {
        sectorNames = [[]]
      }
      let TOKENS = toMatrix(Object.keys(tokenVal), 1)
      if (TOKENS.length === 0) {
        TOKENS = [[]]
      }
      let GRIDS = toMatrix(Object.keys(ledGrids), 1)
      if (GRIDS.length === 0) {
        GRIDS = [[]]
      }
      blocklyInit(Blockly, TOKENS, GRIDS, sectorObject, sectorNames, tokenVal, ledGrids)
      const workspace = Blockly.inject('blockly-wrapper', {toolbox: toolbox})

      workspace.addChangeListener(function () {
        const blocklyXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
        const blocklyState = Blockly.Xml.domToPrettyText(blocklyXML)
        commit('SAVE_BLOCKLY_STATE', blocklyState)
      })

      commit('SET_WORKSPACE', workspace)

      function loadState () {
        let scopedstate = context.getters.GET_BLOCKLY_STATE
        if (scopedstate !== 0) {
          const textToDom = Blockly.Xml.textToDom(scopedstate)
          Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
          Blockly.mainWorkspace.render()
        }
      }

      loadState()
    },
    exportCode ({commit}) {
      commit('EXPORT_CODE')
    },
    downloadCode ({commit}) {
      commit('DOWNLOAD_CODE')
    },
    addCode ({commit}, code) {
      commit('UPLOAD_CODE', code)
      const textToDom = Blockly.Xml.textToDom(code)
      Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
      Blockly.mainWorkspace.render()
    },
    loadCode ({commit}, code) {
      Blockly.mainWorkspace.clear()
      commit('UPLOAD_CODE', code)
      const textToDom = Blockly.Xml.textToDom(code)
      Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
      Blockly.mainWorkspace.render()
    }
  }
}
