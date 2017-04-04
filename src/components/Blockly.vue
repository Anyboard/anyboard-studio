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

Blockly.Blocks['math_change'] = {
  init: function () {
    this.appendValueInput('AMOUNT')
        .appendField(new Blockly.FieldDropdown([['Increase', 'INCREASE'], ['Decrease', 'DECREASE']]), 'TYPE')
        .appendField(new Blockly.FieldVariable('score'), 'VAR')
        .appendField('By')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(330)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

// TODO Autogenerate this list ?? Maybe
var NUMBERFIELDS =
  [['Number Field 1', '1'],
   ['Number Field 1', '2'],
   ['Another Number Field', '3']]

Blockly.Blocks['show_numberfield'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['Show', 'SHOW'], ['Hide', 'HIDE']]), 'TYPE')
        .appendField(new Blockly.FieldDropdown(NUMBERFIELDS), 'TYPE')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['show_number'] = {
  init: function () {
    this.appendValueInput('NUMBER')
        .setCheck('Number')
        .appendField('Show')
    this.appendDummyInput()
        .appendField('On')
        .appendField(new Blockly.FieldDropdown(NUMBERFIELDS), 'TYPE')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

// TODO Autogenerate this list ?? Maybe
var TEXTFIELDS =
  [['Text Field 1', '1'],
   ['Text Field 1', '2'],
   ['Another Text Field', '3']]

Blockly.Blocks['show_textfield'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([['Show', 'SHOW'], ['Hide', 'HIDE']]), 'TYPE')
        .appendField(new Blockly.FieldDropdown(TEXTFIELDS), 'TYPE')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['show_text'] = {
  init: function () {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField('Show')
    this.appendDummyInput()
        .appendField('On')
        .appendField(new Blockly.FieldDropdown(TEXTFIELDS), 'TYPE')
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

Blockly.Blocks['move'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move Token to Tile')
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
        .appendField('Tap Token')
    this.appendStatementInput('STACK')
        .setCheck(null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['tilt'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Tilt Token')
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
        .appendField('Doubletap Token')
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

// TODO Autogenerate this list
var GRIDS =
  [[{'src': '../assets/smiley.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SMILEY'],
   [{'src': '../assets/x.png', 'width': 16, 'height': 16, 'alt': '*'}, 'X'],
   [{'src': '../assets/square.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SQUARE']]

Blockly.Blocks['grid'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(GRIDS), 'GRID')
    this.setOutput(true, 'Grid')
    this.setColour(120)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['random_grid'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Random Grid')
    this.setOutput(true, 'Grid')
    this.setColour(120)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['get_grid'] = {
  init: function () {
    this.appendValueInput('TOKEN')
        .setCheck('Token')
        .appendField('Whatever is displayed on')
    this.setOutput(true, 'Grid')
    this.setColour(120)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

// TODO Autogenerate this list
var TOKENS =
  [['Dragon', 'DRAGON'],
   ['Knight', 'KNIGHT']]

Blockly.Blocks['token'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(TOKENS), 'TOKEN')
    this.setOutput(true, 'Token')
    this.setColour(290)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['current_token'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Current Token')
    this.setOutput(true, 'Token')
    this.setColour(290)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['random_token'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Random Token')
    this.setOutput(true, 'Token')
    this.setColour(290)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['token_test'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Current Token is ')
        .appendField(new Blockly.FieldDropdown(TOKENS), 'TOKEN')
    this.setOutput(true, 'Boolean')
    this.setColour(210)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

// TODO Autogenerate this list
var TILES =
  [['Tile 1', 'TILE1'],
   ['Tile 2', 'TILE2']]

Blockly.Blocks['tile'] = {
  init: function () {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(TILES), 'TILE')
    this.setOutput(true, 'Tile')
    this.setColour(20)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['random_tile'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Random Tile')
    this.setOutput(true, 'Tile')
    this.setColour(20)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['wait'] = {
  init: function () {
    this.appendValueInput('SECONDS')
        .setCheck('Number')
        .appendField('Wait')
    this.appendDummyInput()
        .appendField('Seconds')
    this.setPreviousStatement(true, null)
    this.setNextStatement(true, null)
    this.setColour(255)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

Blockly.Blocks['get_tile'] = {
  init: function () {
    this.appendValueInput('TOKEN')
        .setCheck('Token')
        .appendField('The tile that')
    this.appendDummyInput()
        .appendField('is standing on')
    this.setOutput(true, 'Tile')
    this.setColour(20)
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

Blockly.JavaScript['math_change'] = function (block) {
  var type = block.getFieldValue('TYPE')
  var amount = Blockly.JavaScript.valueToCode(block, 'AMOUNT',
    Blockly.JavaScript.ORDER_ADDITION) || '0'
  var variable = Blockly.JavaScript.variableDB_.getName(
    block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
  var sign = (type === 'INCREASE' ? '+' : '-')
  var code = 'app.' + variable + ' ' + sign + '= ' + amount + ';\n'
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
