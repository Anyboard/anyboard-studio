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

Blockly.Blocks['increase_score'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['Increase', 'INCREASE'], ['Decrease', 'DECREASE']]), 'TYPE')
        .appendField(new Blockly.FieldVariable('score'), 'SCORE')
        .appendField('By')
        .appendField(new Blockly.FieldNumber(1, 0), 'AMOUNT')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['show_score'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Show Score')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['random_color'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Pick Random Color')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['move_to'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move')
        .appendField(new Blockly.FieldVariable('token'), 'TOKEN')
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
        .appendField(new Blockly.FieldVariable('tile'), 'TILE')
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
        .appendField(new Blockly.FieldVariable('token'), 'TOKEN')
        .appendField('To')
        .appendField(new Blockly.FieldVariable('tile'), 'TILE')
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
        .appendField(new Blockly.FieldVariable('token'), 'TOKEN')
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
        .appendField(new Blockly.FieldVariable('token'), 'TOKEN')
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
        .appendField(new Blockly.FieldVariable('token'), 'TOKEN')
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
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var code = 'app.sendVibrationCmd(' + token + ');\n'
  return code
}

Blockly.JavaScript['move_token_to_tile'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(' + token + ', ' + tile + ', options) {\n'
  code += stack + '};\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);'
  return code
}

Blockly.JavaScript['move_to'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var color = block.getFieldValue('COLOR').toUpperCase()
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(' + token + ', constraint, options) {\n'
  code += ' if (constraint == Object.keys(app.locations)[Object.values(app.locations).indexOf("' + color + '")]) {\n'
  code += stack + '}};\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);'
  return code
}

Blockly.JavaScript['move'] = function (block) {
  var color = block.getFieldValue('COLOR')
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(Token, ' + color + ', options) {\n'
  code += stack + '},\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);'
  return code
}

Blockly.JavaScript['move_to_tile'] = function (block) {
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenMove = function(Token, ' + tile + ', options) {\n'
  code += stack + '};\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);'
  return code
}

Blockly.JavaScript['tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenTap = function(' + token + ', options) {\n'
  code += stack + '};\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("TAP", handleTokenTap);'
  return code
}

Blockly.JavaScript['double_tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenDoubleTap = function(' + token + ', options) {\n'
  code += stack + '};\n'
  code += 'AnyBoard.TokenManager.onTokenConstraintEvent("DOUBLE_TAP", handleTokenDoubleTap);'
  return code
}

Blockly.JavaScript['test_init'] = function (block) {
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'hardCodedInitialise: function () {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['increase_score'] = function (block) {
  var type = block.getFieldValue('TYPE')
  var score = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('SCORE'), Blockly.Variables.NAME_TYPE)
  var amount = block.getFieldValue('AMOUNT')
  var sign = (type === 'INCREASE' ? '+' : '-')
  var code = 'app.' + score + ' ' + sign + '= ' + amount + ';\n'
  return code
}

Blockly.JavaScript['show_score'] = function (block) {
  var code = 'app.showScore();\n'
  return code
}

Blockly.JavaScript['random_color'] = function (block) {
  var code = 'app.pickRandomColor();\n'
  return code
}

Blockly.JavaScript['text_print'] = function (block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
  return 'app.setMessage(' + msg + ');\n'
}

Blockly.JavaScript['variables_get'] = function (block) {
  // Variable getter.
  var code = 'app.'
  code += Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE)
  return [code, Blockly.JavaScript.ORDER_ATOMIC]
}

Blockly.JavaScript.init = function (workspace) {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.JavaScript.definitions_ = Object.create(null)
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.JavaScript.functionNames_ = Object.create(null)

  if (!Blockly.JavaScript.variableDB_) {
    Blockly.JavaScript.variableDB_ =
        new Blockly.Names(Blockly.JavaScript.RESERVED_WORDS_)
  } else {
    Blockly.JavaScript.variableDB_.reset()
  }

  var defvars = []
  var variables = workspace.variableList
  if (variables.length) {
    for (var i = 0; i < variables.length; i++) {
      defvars[i] = Blockly.JavaScript.variableDB_.getName(variables[i],
          Blockly.Variables.NAME_TYPE) + ': 0,'
    }
    Blockly.JavaScript.definitions_['variables'] =
        defvars.join('\n')
  }
}

Blockly.JavaScript.finish = function (code) {
  // Convert the definitions dictionary into a list.
  var definitions = []
  for (var name in Blockly.JavaScript.definitions_) {
    definitions.push(Blockly.JavaScript.definitions_[name])
  }
  // Clean up temporary data.
  delete Blockly.JavaScript.definitions_
  delete Blockly.JavaScript.functionNames_
  Blockly.JavaScript.variableDB_.reset()
  var output = definitions.join('\n\n') + '\n\n\n'
  output += 'initiate: function() {\n'
  output += code
  output += '\n\n'
  output += '},'
  return output
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
      var done = temp.replace('//REPLACEMEOKAY//\n', Blockly.JavaScript.workspaceToCode(this.workspace))
      var blob = new Blob([done], {
        type: 'text/html'
      })
      FileSaver.saveAs(blob, 'index.html')
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
