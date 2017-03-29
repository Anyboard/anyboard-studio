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
import store from '../store'

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
  var code = 'this.sendVibrationCmd(' + token + ');\n'
  return code
}

Blockly.JavaScript['move_token_to_tile'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'handleTokenMove: function(' + token + ', ' + tile + ', options) {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['move_to'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var color = block.getFieldValue('COLOR')
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'handleTokenMove: function(' + token + ', ' + color + ', options) {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['move'] = function (block) {
  var color = block.getFieldValue('COLOR')
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'handleTokenMove: function(Token, ' + color + ', options) {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['move_to_tile'] = function (block) {
  var tile = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TILE'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'handleTokenMove: function(Token, ' + tile + ', options) {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenTap: function(' + token + ', options) {\n'
  code += stack + '},\n'
  return code
}

Blockly.JavaScript['double_tap'] = function (block) {
  var token = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('TOKEN'), Blockly.Variables.NAME_TYPE)
  var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
  var code = 'var handleTokenDoubleTap: function(' + token + ', options) {\n'
  code += stack + '},\n'
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
  var code = 'this.' + score + ' ' + sign + '= ' + amount + ';\n'
  return code
}

Blockly.JavaScript['show_score'] = function (block) {
  var code = 'this.showScore();\n'
  return code
}

Blockly.JavaScript['random_color'] = function (block) {
  var code = 'this.pickRandomColor();\n'
  return code
}

Blockly.JavaScript['text_print'] = function (block) {
  var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
  return 'this.setMessage(' + msg + ');\n'
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

export default {
  name: 'blockly',
  data () {
    return {
      workspace: null,
      code: 'test'
    }
  },
  mounted () {
    Blockly.FieldColour.COLOURS = store.state.colours
    Blockly.FieldColour.COLUMNS = 3

    let toolbox = '<xml>'
    toolbox += '  <category name="Logic" colour="#5C81A6">'
    toolbox += '    <block type="controls_if"></block>'
    toolbox += '    <block type="logic_compare">'
    toolbox += '      <field name="OP">EQ</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="logic_operation">'
    toolbox += '      <field name="OP">AND</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="logic_negate"></block>'
    toolbox += '    <block type="logic_boolean">'
    toolbox += '      <field name="BOOL">TRUE</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="logic_null"></block>'
    toolbox += '    <block type="logic_ternary"></block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Loops" colour="#5CA65C">'
    toolbox += '    <block type="controls_repeat_ext">'
    toolbox += '      <value name="TIMES">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">10</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="controls_whileUntil">'
    toolbox += '      <field name="MODE">WHILE</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="controls_for">'
    toolbox += '      <field name="VAR">i</field>'
    toolbox += '      <value name="FROM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="TO">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">10</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="BY">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="controls_forEach">'
    toolbox += '      <field name="VAR">j</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="controls_flow_statements">'
    toolbox += '      <field name="FLOW">BREAK</field>'
    toolbox += '    </block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Math" colour="#5C68A6">'
    toolbox += '    <block type="math_round">'
    toolbox += '      <field name="OP">ROUND</field>'
    toolbox += '      <value name="NUM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">3.1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_number">'
    toolbox += '      <field name="NUM">0</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_single">'
    toolbox += '      <field name="OP">ROOT</field>'
    toolbox += '      <value name="NUM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">9</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_trig">'
    toolbox += '      <field name="OP">SIN</field>'
    toolbox += '      <value name="NUM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">45</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_constant">'
    toolbox += '      <field name="CONSTANT">PI</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_number_property">'
    toolbox += '      <mutation divisor_input="false"></mutation>'
    toolbox += '      <field name="PROPERTY">EVEN</field>'
    toolbox += '      <value name="NUMBER_TO_CHECK">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">0</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_arithmetic">'
    toolbox += '      <field name="OP">ADD</field>'
    toolbox += '      <value name="A">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="B">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_on_list">'
    toolbox += '      <mutation op="SUM"></mutation>'
    toolbox += '      <field name="OP">SUM</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_modulo">'
    toolbox += '      <value name="DIVIDEND">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">64</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="DIVISOR">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">10</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_constrain">'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">50</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="LOW">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="HIGH">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">100</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_random_int">'
    toolbox += '      <value name="FROM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">1</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="TO">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">100</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="math_random_float"></block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Text" colour="#5CA68D">'
    toolbox += '    <block type="text_charAt">'
    toolbox += '      <mutation at="true"></mutation>'
    toolbox += '      <field name="WHERE">FROM_START</field>'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">text</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text">'
    toolbox += '      <field name="TEXT"></field>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_append">'
    toolbox += '      <field name="VAR">item</field>'
    toolbox += '      <value name="TEXT">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT"></field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_length">'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_isEmpty">'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT"></field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_indexOf">'
    toolbox += '      <field name="END">FIRST</field>'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">text</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '      <value name="FIND">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_join">'
    toolbox += '      <mutation items="2"></mutation>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_getSubstring">'
    toolbox += '      <mutation at1="true" at2="true"></mutation>'
    toolbox += '      <field name="WHERE1">FROM_START</field>'
    toolbox += '      <field name="WHERE2">FROM_START</field>'
    toolbox += '      <value name="STRING">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">text</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_changeCase">'
    toolbox += '      <field name="CASE">UPPERCASE</field>'
    toolbox += '      <value name="TEXT">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_trim">'
    toolbox += '      <field name="MODE">BOTH</field>'
    toolbox += '      <value name="TEXT">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_print">'
    toolbox += '      <value name="TEXT">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="text_prompt_ext">'
    toolbox += '      <mutation type="TEXT"></mutation>'
    toolbox += '      <field name="TYPE">TEXT</field>'
    toolbox += '      <value name="TEXT">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">abc</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Lists" colour="#745CA6">'
    toolbox += '    <block type="lists_indexOf">'
    toolbox += '      <field name="END">FIRST</field>'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">list</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_create_with">'
    toolbox += '      <mutation items="0"></mutation>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_repeat">'
    toolbox += '      <value name="NUM">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">5</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_length"></block>'
    toolbox += '    <block type="lists_isEmpty"></block>'
    toolbox += '    <block type="lists_create_with">'
    toolbox += '      <mutation items="3"></mutation>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_getIndex">'
    toolbox += '      <mutation statement="false" at="true"></mutation>'
    toolbox += '      <field name="MODE">GET</field>'
    toolbox += '      <field name="WHERE">FROM_START</field>'
    toolbox += '      <value name="VALUE">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">list</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_setIndex">'
    toolbox += '      <mutation at="true"></mutation>'
    toolbox += '      <field name="MODE">SET</field>'
    toolbox += '      <field name="WHERE">FROM_START</field>'
    toolbox += '      <value name="LIST">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">list</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_getSublist">'
    toolbox += '      <mutation at1="true" at2="true"></mutation>'
    toolbox += '      <field name="WHERE1">FROM_START</field>'
    toolbox += '      <field name="WHERE2">FROM_START</field>'
    toolbox += '      <value name="LIST">'
    toolbox += '        <block type="variables_get">'
    toolbox += '          <field name="VAR">list</field>'
    toolbox += '        </block>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_split">'
    toolbox += '      <mutation mode="SPLIT"></mutation>'
    toolbox += '      <field name="MODE">SPLIT</field>'
    toolbox += '      <value name="DELIM">'
    toolbox += '        <shadow type="text">'
    toolbox += '          <field name="TEXT">,</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="lists_sort">'
    toolbox += '      <field name="TYPE">NUMERIC</field>'
    toolbox += '      <field name="DIRECTION">1</field>'
    toolbox += '    </block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Colour" colour="#A6745C">'
    toolbox += '    <block type="colour_picker">'
    toolbox += '      <field name="COLOUR">#ff0000</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="colour_random"></block>'
    toolbox += '    <block type="colour_rgb">'
    toolbox += '      <value name="RED">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">100</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="GREEN">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">50</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="BLUE">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">0</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '    <block type="colour_blend">'
    toolbox += '      <value name="COLOUR1">'
    toolbox += '        <shadow type="colour_picker">'
    toolbox += '          <field name="COLOUR">#ff0000</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="COLOUR2">'
    toolbox += '        <shadow type="colour_picker">'
    toolbox += '          <field name="COLOUR">#3333ff</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '      <value name="RATIO">'
    toolbox += '        <shadow type="math_number">'
    toolbox += '          <field name="NUM">0.5</field>'
    toolbox += '        </shadow>'
    toolbox += '      </value>'
    toolbox += '    </block>'
    toolbox += '  </category>'
    toolbox += '  <sep></sep>'
    toolbox += '  <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>'
    toolbox += '  <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>'
    toolbox += '  <category name="Input">'
    toolbox += '    <block type="move">'
    toolbox += '      <field name="NAME">#ff0000</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="move_to_tile">'
    toolbox += '      <field name="TILE">Tile</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="move_to">'
    toolbox += '      <field name="TOKEN">Token</field>'
    toolbox += '      <field name="COLOR">#ff0000</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="move_token_to_tile">'
    toolbox += '      <field name="TOKEN">Token</field>'
    toolbox += '      <field name="TILE">Tile</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="tap">'
    toolbox += '      <field name="TOKEN">Token</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="double_tap">'
    toolbox += '      <field name="TOKEN">Token</field>'
    toolbox += '    </block>'
    toolbox += '    <block type="test_init"></block>'
    toolbox += '  </category>'
    toolbox += '  <category name="Output">'
    toolbox += '    <block type="vibrate"></block>'
    toolbox += '    <block type="grid"></block>'
    toolbox += '    <block type="show_grid"></block>'
    toolbox += '    <block type="increase_score"></block>'
    toolbox += '    <block type="show_score"></block>'
    toolbox += '    <block type="random_color"></block>'
    toolbox += '  </category>'
    toolbox += '</xml>'
    this.workspace = Blockly.inject('blockly-wrapper', {toolbox: toolbox})
  },
  methods: {
    showCode: function () {
      this.code = Blockly.JavaScript.workspaceToCode(this.workspace)
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
