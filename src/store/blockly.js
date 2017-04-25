import Blockly from 'node-blockly/browser'
import toolbox from '../utilities/blockly-toolbox.js'
import htmlTemplate from '../utilities/html-template'
import blocklyInit from '../utilities/blockly-init.js'
import FileSaver from 'file-saver'

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
      const done = htmlTemplate.replace('//REPLACEMEOKAY//\n', Blockly.JavaScript.workspaceToCode(state.workspace))
      const blob = new Blob([done], {
        type: 'text/html'
      })
      FileSaver.saveAs(blob, 'index.html')
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

      var sectorObject = rootGetters.GET_SECTORS
      console.log(sectorObject)
      var sectorNames = toMatrix(Object.keys(sectorObject), 1)  // used tilesnames for dropdown

      var tokenVal = {
        'Dragon': ['vibrate'],
        'Knight': ['led']
      }

      var TOKENS = toMatrix(Object.keys(tokenVal), 1)
      blocklyInit(Blockly, TOKENS, sectorObject, sectorNames, tokenVal)
      const workspace = Blockly.inject('blockly-wrapper', {toolbox: toolbox})

      workspace.addChangeListener(function () {
        const blocklyXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
        const blocklyState = Blockly.Xml.domToPrettyText(blocklyXML)
        commit('SAVE_BLOCKLY_STATE', blocklyState)
      })

      commit('SET_WORKSPACE', workspace)

      function loadState () {
        let scopedstate = context.getters.GET_BLOCKLY_STATE
        console.log(scopedstate)
        if (scopedstate !== 0) {
          var textToDom = Blockly.Xml.textToDom(scopedstate)
          Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
          Blockly.mainWorkspace.render()
        }
      }

      console.log(context)

      loadState()
    },
    exportCode ({commit}) {
      commit('EXPORT_CODE')
    },
    downloadCode ({commit}) {
      commit('DOWNLOAD_CODE')
    },
    uploadCode ({commit}, code) {
      commit('UPLOAD_CODE', code)
      var textToDom = Blockly.Xml.textToDom(code)
      Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
      Blockly.mainWorkspace.render()
    }
  }
}
