<template>
  <div>
    <img src='../assets/smiley.png'>
    <div id="blockly-wrapper" style="height: 480px; width: 600px;"></div>
    <button v-on:click="showCode()">Show Code</button>
    <button v-on:click="exportHTML()">Export</button>
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

export default {
  name: 'blockly',
  data () {
    return {
      workspace: null,
      code: 'test'
    }
  },
  mounted () {
    // #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################

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
            .appendField(new Blockly.FieldDropdown(NUMBERFIELDS), 'FIELD')
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
            .appendField(new Blockly.FieldDropdown(NUMBERFIELDS), 'FIELD')
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
            .appendField(new Blockly.FieldDropdown(TEXTFIELDS), 'FIELD')
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
            .appendField(new Blockly.FieldDropdown(TEXTFIELDS), 'FIELD')
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
            .appendField('Move Token to Sector')
        this.appendStatementInput('STACK')
            .setCheck(null)
        this.setColour(65)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }

    Blockly.Blocks['vibrate'] = {
      init: function () {
        this.appendValueInput('TOKEN')
            .setCheck('Token')
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
            .appendField('Show')
        this.appendValueInput('TOKEN')
            .setCheck('Token')
            .setAlign(Blockly.ALIGN_CENTRE)
            .appendField('On')
        this.setInputsInline(true)
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
        this.appendValueInput('TOKEN')
            .setCheck('Token')
            .appendField('Current Token is ')
        this.setOutput(true, 'Boolean')
        this.setColour(210)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }
/*
    // TODO Autogenerate this list
    var sectornames =
      [['Sector 1', 'SECTOR1'],
       ['Sector 2', 'SECTOR2']]
*/
    Blockly.Blocks['sector'] = {
      init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(sectorNames), 'SECTOR')
        this.setOutput(true, 'Sector')
        this.setColour(20)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }

    Blockly.Blocks['random_sector'] = {
      init: function () {
        this.appendDummyInput()
            .appendField('Random Sector')
        this.setOutput(true, 'Sector')
        this.setColour(20)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }

    Blockly.Blocks['get_sector'] = {
      init: function () {
        this.appendValueInput('TOKEN')
            .setCheck('Token')
            .appendField('The tile that')
        this.appendDummyInput()
            .appendField('is standing on')
        this.setOutput(true, 'Sector')
        this.setColour(20)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }

    Blockly.Blocks['sector_test'] = {
      init: function () {
        this.appendValueInput('TOKEN')
            .setCheck('Token')
        this.appendValueInput('SECTOR')
            .setCheck('Sector')
            .appendField('is standing on')
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean')
        this.setColour(210)
        this.setTooltip('')
        this.setHelpUrl('')
      }
    }

    Blockly.Blocks['current_sector_test'] = {
      init: function () {
        this.appendValueInput('SECTOR')
            .setCheck('Sector')
            .appendField('Current token is standing on')
        this.setInputsInline(true)
        this.setOutput(true, 'Boolean')
        this.setColour(210)
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

    Blockly.JavaScript['grid'] = function (block) {
      var dropdownGrid = block.getFieldValue('GRID')
      var code = dropdownGrid
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['show_grid'] = function (block) {
      var grid = Blockly.JavaScript.valueToCode(block, 'GRID', Blockly.JavaScript.ORDER_COMMA)
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
      var code = 'app.show_grid(' + token + ', ' + grid + ');\n'
      return code
    }

    Blockly.JavaScript['random_grid'] = function (block) {
      var code = 'app.getRandomGrid()'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['get_grid'] = function (block) {
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
      var code = 'app.getGrid(' + token + ');\n'
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['token'] = function (block) {
      var token = block.getFieldValue('TOKEN')
      var code = token
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['current_token'] = function (block) {
      var code = 'currentToken'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['token_test'] = function (block) {
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_EQUALITY)
      var code = 'currentToken == ' + token
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_EQUALITY]
    }

    Blockly.JavaScript['random_token'] = function (block) {
      var code = 'app.getRandomToken()'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['sector'] = function (block) {
      var sector = block.getFieldValue('SECTOR')
      var constr = sectorObject[sector]
      var code = constr
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['random_sector'] = function (block) {
      var code = 'app.getRandomSector()'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['get_sector'] = function (block) {
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
      var code = 'app.getSector(' + token + ');\n'
      return [code, Blockly.JavaScript.ORDER_MEMBER]
    }

    Blockly.JavaScript['sector_test'] = function (block) {
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
      var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
      var code = sector + ' == getSector(' + token + ')'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }

    Blockly.JavaScript['current_sector_test'] = function (block) {
      var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
      var code = sector + ' == constraint'
      // TODO: Change ORDER_NONE to the correct strength.
      return [code, Blockly.JavaScript.ORDER_NONE]
    }

    Blockly.JavaScript['vibrate'] = function (block) {
      var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
      var code = 'app.sendVibrationCmd(' + token + ');\n'
      return code
    }

    Blockly.JavaScript['move'] = function (block) {
      var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
      var code = 'var handleTokenMove = function(currentToken, constraint, options) {\n'
      code += stack + '};\n'
      code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);'
      return code
    }

    Blockly.JavaScript['tap'] = function (block) {
      var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
      var code = 'var handleTokenTap = function(currentToken , options) {\n'
      code += stack + '};\n'
      code += 'AnyBoard.TokenManager.onTokenConstraintEvent("TAP", handleTokenTap);'
      return code
    }

    Blockly.JavaScript['double_tap'] = function (block) {
      var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
      var code = 'var handleTokenDoubleTap = function(currentToken , options) {\n'
      code += stack + '};\n'
      code += 'AnyBoard.TokenManager.onTokenConstraintEvent("DOUBLE_TAP", handleTokenDoubleTap);'
      return code
    }

    Blockly.JavaScript['tilt'] = function (block) {
      var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
      var code = 'var handleTokenTilt = function(currentToken , options) {\n'
      code += stack + '};\n'
      code += 'AnyBoard.TokenManager.onTokenConstraintEvent("TILT", handleTokenTilt);'
      return code
    }

    Blockly.JavaScript['test_init'] = function (block) {
      var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
      var code = '\n'
      code += stack + '\n'
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

    Blockly.JavaScript['wait'] = function (block) {
      var seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC)
      var code = 'app.wait(' + seconds + ');\n'
      return code
    }

    Blockly.JavaScript['show_text'] = function (block) {
      var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
      var field = block.getFieldValue('FIELD')
      return 'app.setMessage(' + msg + ', ' + field + ');\n'
    }

    Blockly.JavaScript['show_textfield'] = function (block) {
      var type = block.getFieldValue('TYPE')
      var field = block.getFieldValue('FIELD')
      var truth = (type === 'SHOW' ? 'true' : 'false')
      return 'app.showTextField(' + truth + ', ' + field + ');\n'
    }

    Blockly.JavaScript['show_number'] = function (block) {
      var num = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_NONE) || '\'\''
      var field = block.getFieldValue('FIELD')
      return 'app.setNumber(' + num + ', ' + field + ');\n'
    }

    Blockly.JavaScript['show_numberfield'] = function (block) {
      var type = block.getFieldValue('TYPE')
      var field = block.getFieldValue('FIELD')
      var truth = (type === 'SHOW' ? 'true' : 'false')
      return 'app.showNumberField(' + truth + ', ' + field + ');\n'
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
/*
    var tilesdict = {
      'key1': 'value1',
      'key2': 'value2',
      'key3': 'value3'
    }
*/
    Blockly.JavaScript.writeDictionary = function (name, dict) {
      var result = name
      result += ': {\n'
      var first = true
      for (var key in dict) {
        if (!first) {
          result += ',\n'
        }
        first = false
        result += key + ': ' + dict[key]
      }
      result += '\n},\n\n\n'
      return result
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
      // output += Blockly.JavaScript.writeDictionary('tiles', tilesdict)
      output += 'initiate: function() {\n'
      output += code
      output += '\n\n'
      output += '},'
      return output
    }
// #####################################################################################################################
// #####################################################################################################################
// #####################################################################################################################
/*
    var tileColours = store.getters.GET_COLOURS
    Blockly.FieldColour.COLOURS = tileColours
    Blockly.FieldColour.COLUMNS = 3
*/
    const toMatrix = (arr, width) =>
      arr.reduce((rows, key, index) => (index % width === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows, [])
    var sectorObject = store.getters.GET_SECTORS
    var sectorNames = toMatrix(Object.keys(sectorObject), 1)  // used tilesnames for dropdown
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
  },
  methods: {
    showCode: function () {
      this.code = Blockly.JavaScript.workspaceToCode(this.workspace)
    },
    exportHTML: function () {
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
