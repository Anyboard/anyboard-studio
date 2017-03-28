<template>
  <div>
    <img src='../assets/smiley.png'>
    <div id="blockly-wrapper" style="height: 480px; width: 600px;"></div>
    <button v-on:click="showCode()">Show Code</button>
    <br/>
    <div id="codeWrapper">
      <p style="white-space: pre" id="shownCode">{{ code }}</p>
    </div>
  </div>
</template>
<script>
import Blockly from 'node-blockly/browser'
import store from '../store/store'
import toolbox from '../store/toolbox'
import templateStore from '../store/templateStore'
import FileSaver from 'file-saver'

Blockly.Blocks['move_to'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move')
        .appendField(new Blockly.FieldVariable('Token'), 'TOKEN')
        .appendField('To')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COLOR')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['move'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move To')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COLOR')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['move_to_tile'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move To')
        .appendField(new Blockly.FieldVariable('Tile'), 'TILE')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['move_token_to_tile'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move')
        .appendField(new Blockly.FieldVariable('Token'), 'TOKEN')
        .appendField('To')
        .appendField(new Blockly.FieldVariable('Tile'), 'TILE')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['vibrate'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Vibrate')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['tap'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Tap')
        .appendField(new Blockly.FieldVariable('Token'), 'TOKEN')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['double_tap'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Doubletap')
        .appendField(new Blockly.FieldVariable('Token'), 'TOKEN')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['test_init'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Set up before game')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['show_grid'] = {
  init: function () {
    this.appendValueInput('GRID')
        .setCheck('Grid')
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField('Show Grid')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['grid'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([[{'src': '../assets/smiley.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SMILEY'], [{'src': '../assets/x.png', 'width': 16, 'height': 16, 'alt': '*'}, 'X'], [{'src': '../assets/square.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SQUARE']]), 'GRID')
    this.setOutput(true, 'Grid')
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.JavaScript['grid'] = function (block) {
  var dropdownGrid = block.getFieldValue('GRID')
  var code = dropdownGrid
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE]
}

Blockly.JavaScript['show_grid'] = function (block) {
  var grid = Blockly.JavaScript.valueToCode(block, 'GRID', Blockly.JavaScript.ORDER_ATOMIC)
  // TODO: Assemble JavaScript into code variable.
  var code = 'show_grid(' + grid + ');\n'
  return code
}

Blockly.JavaScript['vibrate'] = function (block) {
  var code = 'token.vibrate();\n'
  return code
}

Blockly.JavaScript['move_token_to_tile'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(' + token + ', ' + tile + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['move_to'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var color = block.getFieldValue('COLOR')
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(' + token + ', ' + color + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['move'] = function (block) {
  var color = block.getFieldValue('COLOR')
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(Token, ' + color + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['move_to_tile'] = function (block) {
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(Token, ' + tile + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenTap = function(' + token + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['double_tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenDoubleTap = function(' + token + ', options) {\n'
  code += stack + '};\n'
  return code
}

Blockly.JavaScript['test_init'] = function (block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'init () {\n'
  code += stack + '};\n'
  return code
}

export default {
  name: 'blockly',
  data () {
    return {
      workspace: null,
      code: 'test'
    }
  },
  mounted () {
    var tileColours = store.getters.GET_COLOURS
    Blockly.FieldColour.COLOURS = tileColours
    Blockly.FieldColour.COLUMNS = 3

    var tb = toolbox.getters.GET_TOOLBOX

    this.workspace = Blockly.inject('blockly-wrapper', {toolbox: tb})

    this.workspace.addChangeListener(function () {
      var blocklyXML = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
      var blocklyState = Blockly.Xml.domToPrettyText(blocklyXML)
      store.dispatch('SAVE_BLOCKLY', blocklyState)
    })

    function loadState () {
      var state = store.getters.GET_BLOCKLY
      if (state !== 0) {
        var textToDom = Blockly.Xml.textToDom(state)
        Blockly.Xml.domToWorkspace(textToDom, Blockly.mainWorkspace)
        Blockly.mainWorkspace.render()
      }
    }

    loadState()

    /** function loadHTMLString () {
      var temp = templateStore.getters.GET_HTML
      var done = temp.replace('!!!REPLACEME!!!', 'var handleTokenDoubleTap = function (token) {' + '        };')
      var blob = new Blob([done], {
        type: 'text/html'
      })
      FileSaver.saveAs(blob, 'testing.html')
    }**/
  },
  methods: {
    showCode: function () {
      this.code = Blockly.JavaScript.workspaceToCode(this.workspace)
      var temp = templateStore.getters.GET_HTML
      var done = temp.replace('!!!REPLACEME!!!', Blockly.JavaScript.workspaceToCode(this.workspace))
      var blob = new Blob([done], {
        type: 'text/html'
      })
      FileSaver.saveAs(blob, 'testing.html')
    }
  }
}
</script>
<style scoped>
  #blockly-wrapper{
    text-align: center;
    margin: auto;
  }

  #codeWrapper{
    text-align: center;
    width: auto;
    display: inline-block;
  }

  #shownCode{
    text-align: left;
    margin: auto;

  }
</style>
