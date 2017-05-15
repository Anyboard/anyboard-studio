import {colorHexToRGB} from './helpers.js'

/*
* This file defines custom blocks.
* How a block looks is defined with Blockly.Blocks['block_name']
* The code that a block generates is defined with Blocky.JavaScript['block_name']
* As per Blockly standard, the block names start with the category the block belongs to
*
* Make sure to include all defined blocks in utilities/blockly-toolbox.js, otherwise they won't show up.
* That is also where you define what other blocks and values they come prefilled with.
*
* The code generated here is inserted into html-template.js, and together they generate an index.html file.
*/

const blocklyInit = function (Blockly, TOKENS, GRIDS, sectorObject, sectorNames, tokenVal, ledGrids) {
  /*
  * Input blocks
  * These define functions that are called every time the corresponding action is performed on a Token.
  * Only one of each should be used per game, otherwise they overwrite each other.
  */

  // The init block, which initialises the game. Code placed within is run at the start, to set up variables and such.
  // Also includes fields to define the player numbers
  var PLAYERNUM = []
  for (var i = 1; i < 7; i++) {
    PLAYERNUM.push([i.toString()])
  }
  Blockly.Blocks['input_game_init'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Set up before game')
      this.appendDummyInput()
        .appendField('Set player number between')
        .appendField(new Blockly.FieldDropdown(PLAYERNUM), 'MIN')
        .appendField('and')
        .appendField(new Blockly.FieldDropdown(PLAYERNUM), 'MAX')
      this.appendDummyInput()
        .appendField('Set paper type to')
        .appendField(new Blockly.FieldDropdown([['Laserprinter', '1'], ['Inkjet', '2']]), 'PAPER')
      this.appendStatementInput('STACK')
        .setCheck(null)
      this.setColour(65)
      this.setTooltip('This runs at the start of the game.\n Do not include any currentToken blocks here.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_game_init'] = function (block) {
    // this sets variables (minPlayers, maxPlayers and paper_type) which are later used in the finish function
    var minPlayers = block.getFieldValue('MIN')
    var maxPlayers = block.getFieldValue('MAX')
    if (minPlayers === '' && maxPlayers === '') {
      Blockly.JavaScript.min_players = null
      Blockly.JavaScript.max_players = null
    } else if (minPlayers === '') {
      Blockly.JavaScript.min_players = maxPlayers
      Blockly.JavaScript.max_players = maxPlayers
    } else if (maxPlayers === '') {
      Blockly.JavaScript.min_players = minPlayers
      Blockly.JavaScript.max_players = minPlayers
    } else if (minPlayers < maxPlayers) {
      Blockly.JavaScript.min_players = minPlayers
      Blockly.JavaScript.max_players = maxPlayers
    } else {
      Blockly.JavaScript.min_players = maxPlayers
      Blockly.JavaScript.max_players = minPlayers
    }
    Blockly.JavaScript.paper_type = block.getFieldValue('PAPER')
    // actual code generation for this block starts here
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = '\n'
    code += stack + '\n'
    return code
  }

  // The code placed within the Move block is triggered when a Token moves to a Sector.
  Blockly.Blocks['input_move'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Move Token to Sector')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is moved to a different sector.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_move'] = function (block) {
    // this doesn't add to the code generated, but is later used in the finish function
    Blockly.JavaScript.hasMoveBlock = true
    // actual code generation for this block starts here
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenMove = function(currentToken, constraint, options) {\n'
    code += 'currentToken.sector = constraint;\n' // this ensures that the token knows which Sector it is standing on
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);\n'
    return code
  }

  // The code placed within the Tap block is triggered when a Token is tapped.
  Blockly.Blocks['input_tap'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Tap Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is tapped.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_tap'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTap = function(currentToken , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowTap")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TAP", handleTokenTap);\n'
    return code
  }

  // The code placed within the Doubletap block is triggered when a Token is tapped twice quickly.
  Blockly.Blocks['input_double_tap'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Doubletap Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is doubletapped.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_double_tap'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenDoubleTap = function(currentToken , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowDoubleTap")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("DOUBLE_TAP", handleTokenDoubleTap);\n'
    return code
  }

  // The code placed within the Shake block is triggered when a Token is shaken.
  Blockly.Blocks['input_shake'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Shake Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is shaken.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_shake'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenShake = function(currentToken , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowShake")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("SHAKE", handleTokenShake);\n'
    return code
  }

  // The code placed within the Tilt block is triggered when a Token is tilted.
  Blockly.Blocks['input_tilt'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Tilt Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is tilted.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_tilt'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTilt = function(currentToken , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowTilt")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TILT", handleTokenTilt);\n'
    return code
  }

  // The code placed within the Turn block is triggered when a Token is turned.
  // This also has information on which way the token was turned, hence we need to different functions for those options.
  Blockly.Blocks['input_turn'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Turn Token clockwise')
      this.appendStatementInput('STACK1')
          .setCheck(null)
      this.appendDummyInput()
          .appendField('Turn Token counterclockwise')
      this.appendStatementInput('STACK2')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token turned.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_turn'] = function (block) {
    var stack1 = Blockly.JavaScript.statementToCode(block, 'STACK1')
    var stack2 = Blockly.JavaScript.statementToCode(block, 'STACK2')
    var code = 'var handleTokenTurn = function(currentToken , direction , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowTurn")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += 'if (direction == 1) {\n'
    code += stack1
    code += '} else {\n'
    code += stack2
    code += '};\n'
    code += '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("ROTATE", handleTokenTurn);\n'
    return code
  }

  // Currently not implemented in the hardware, hence not tested and disabled.
  // If you want to enable this block, remember to remove the disabled="true" from utilities/blockly-toolbox.js
  // The code placed within the TTE block is triggered when a Token is moved next to another Token.
  Blockly.Blocks['input_token_token_interaction'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Move Other Token close to Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Feature currently not available.\n Triggered when a token is moved next to another token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['input_token_token_interaction'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTokenInteraction = function(currentToken , otherToken , options) {\n'
    code += 'if(app.tokenVal.hasOwnProperty(currentToken.id) && app.tokenVal.hasOwnProperty(otherToken.id)) {'
    code += 'if (!app.tokenVal[currentToken.id].includes("allowTokenToken") || !app.otherToken[token.id].includes("allowTokenToken")) {\n'
    code += 'return\n'
    code += '}\n'
    code += '}\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TTE", handleTokenTokenInteraction);\n'
    return code
  }

  /*
  * Output blocks
  * These define various outputs on the tokens and the mobile screen.
  */

  // The Vibration block causes a block to vibrate for the indicated duration
  var VIBRATIONLENGTHS =
    [['long', '100'],
     ['medium', '30'],
     ['short', '10']]
  Blockly.Blocks['output_vibrate'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Vibrate')
      this.appendDummyInput()
          .appendField('for a')
          .appendField(new Blockly.FieldDropdown(VIBRATIONLENGTHS), 'LENGTH')
          .appendField('time')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Vibrates a token for the indicated duration.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_vibrate'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var length = block.getFieldValue('LENGTH')
    var code = 'app.sendVibrationCmd(' + token + ', ' + length + ');\n'
    return code
  }

  // Currently not implemented in the hardware, hence not tested.
  // Not even included in the toolbox, because the design was too similar to the Vibration block
  // If you want to enable this block, remember to remove the disabled="true" from utilities/blockly-toolbox.js
  // The Vibration block causes a block to vibrate in the indicated pattern
  var VIBRATIONPATTERNS =
    [['long', 'patternArray1'],
     ['short', 'patternArray2'],
     ['twice', 'patternArray3'],
     ['my awesome vibration', 'patternArray4']]
  Blockly.Blocks['output_vibrate_pattern'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Vibrate')
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(VIBRATIONPATTERNS), 'PATTERN')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Vibrates a token in the selected pattern.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_vibrate_pattern'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var pattern = block.getFieldValue('PATTERN')
    var code = 'app.sendVibrationPatternCmd(' + token + ', ' + pattern + ');\n'
    return code
  }

  // The LED block sets the LED of a Token to a specific colour
  // setting available colours for the Blockly Colour selector
  Blockly.FieldColour.COLOURS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
  Blockly.FieldColour.COLUMNS = 7
  Blockly.Blocks['output_led_on'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('Change light color for')
      this.appendDummyInput()
          .appendField('To')
          .appendField(new Blockly.FieldColour('#ff0000'), 'COLOR')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Sets the led color for the selected token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_led_on'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var color = block.getFieldValue('COLOR')
    var led = colorHexToRGB(color)
    var code = 'app.sendLedOnCmd(' + token + ', [' + led + ']);\n'
    return code
  }

  // The LED off block turns the LED of a Token off
  Blockly.Blocks['output_led_off'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Turn light off for')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Turns off the led for the selected token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_led_off'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.sendLedOnCmd(' + token + ', [0, 0, 0]);\n'
    return code
  }

  // The LED blink block causes the LED of a Token to blink
  var BLINKSPEEDS =
    [['very fast', '10'],
     ['fast', '20'],
     ['slow', '75'],
     ['very slow', '150']]
  Blockly.Blocks['output_led_blink'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Blink the light on')
      this.appendValueInput('TIME')
          .setCheck('Number')
          .appendField(new Blockly.FieldDropdown(BLINKSPEEDS), 'SPEED')
         .appendField('for')
      this.appendDummyInput()
          .appendField('seconds')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Blinks the led for the token at the selected speed.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_led_blink'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_COMMA)
    var period = block.getFieldValue('SPEED')
    var code = 'app.sendLedBlinkCmd(' + token + ', ' + time + ', ' + period + ');\n'
    return code
  }

  // The wait block runs the code placed inside it after the indicated amount of time.
  // This is done via setTimeout(), which causes some issues with loops
  // break blocks will not work inside a wait block
  // and all the wait blocks placed inside a loop will start at the same time
  Blockly.Blocks['output_wait'] = {
    init: function () {
      this.appendValueInput('SECONDS')
          .setCheck('Number')
          .appendField('Wait')
      this.appendDummyInput()
          .appendField('Seconds then do')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setPreviousStatement(true, null)
      this.setColour(255)
      this.setTooltip('Waits for the specified time, then runs the blocks inside this one.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_wait'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC)
    var milliseconds = seconds + ' * 1000'
    var code = 'setTimeout(function () {\n'
    code += stack
    code += '}, ' + milliseconds + ');\n'
    return code
  }

  // The SetTitle block sets the title of the game to the indicated string.
  Blockly.Blocks['output_set_title'] = {
    init: function () {
      this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('Set Game Title to')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Sets the game title on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_set_title'] = function (block) {
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
    return '$(\'#title\').html(' + msg + ');\n'
  }

  // The show text block shows sets the contents of a textfield to a string.
  var TEXTFIELDS =
    [['Text Field 1', 'message1'],
     ['Text Field 2', 'message2'],
     ['Text Field 3', 'message3']]
  Blockly.Blocks['output_show_text'] = {
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
      this.setTooltip('Shows the provided number on the selected numberfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_show_text'] = function (block) {
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
    var field = block.getFieldValue('FIELD')
    return '$(\'#' + field + '\').html(' + msg + ');\n'
  }

  // The showtextfield block shows or hides a textfield
  // this uses the same TEXTFIELDS variable defined in the show text block
  Blockly.Blocks['output_show_textfield'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([['Show', 'SHOW'], ['Hide', 'HIDE']]), 'TYPE')
          .appendField(new Blockly.FieldDropdown(TEXTFIELDS), 'FIELD')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Shows or hides the selected textfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_show_textfield'] = function (block) {
    var type = block.getFieldValue('TYPE')
    var field = block.getFieldValue('FIELD')
    var truth = (type === 'SHOW')
    if (truth) {
      return '$(\'#' + field + '\').show();\n'
    } else {
      return '$(\'#' + field + '\').hide();\n'
    }
  }

  // The show number block shows sets the contents of a numberfield to a number.
  var NUMBERFIELDS =
    [['Number Field 1', 'number1'],
     ['Number Field 2', 'number2'],
     ['Number Field 3', 'number3']]
  Blockly.Blocks['output_show_number'] = {
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
      this.setTooltip('Shows the provided number on the selected numberfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_show_number'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_NONE) || '\'\''
    var field = block.getFieldValue('FIELD')
    return '$(\'#' + field + '\').html(' + num + ');\n'
  }

  // The shownumberfield block shows or hides a numberfield
  // this uses the same NUMBERFIELDS variable defined in the show number block
  Blockly.Blocks['output_show_numberfield'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([['Show', 'SHOW'], ['Hide', 'HIDE']]), 'TYPE')
          .appendField(new Blockly.FieldDropdown(NUMBERFIELDS), 'FIELD')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(255)
      this.setTooltip('Shows or hides the selected numberfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['output_show_numberfield'] = function (block) {
    var type = block.getFieldValue('TYPE')
    var field = block.getFieldValue('FIELD')
    var truth = (type === 'SHOW')
    if (truth) {
      return '$(\'#' + field + '\').show();\n'
    } else {
      return '$(\'#' + field + '\').hide();\n'
    }
  }

  /*
  * Display/Grid/Pattern blocks
  * These define various outputs on the tokens and the mobile screen.
  */

  Blockly.Blocks['grid'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(GRIDS), 'GRID')
      this.setOutput(true, 'Grid')
      this.setColour(120)
      this.setTooltip('A grid that can be shown on a token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['grid'] = function (block) {
    var dropdownGrid = block.getFieldValue('GRID')
    var grid = ledGrids[dropdownGrid]
    var code = '['
    for (var i = 0; i < 8; i++) {
      if (i > 0) {
        code += ', '
      }
      code += '0x'
      code += grid.substr(i * 2, 2)
    }
    code += ']'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  Blockly.Blocks['random_grid'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Random Grid')
      this.setOutput(true, 'Grid')
      this.setColour(120)
      this.setTooltip('Selects a random grid from the ones built in the Token Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['random_grid'] = function (block) {
    var code = 'app.getRandomGrid()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  Blockly.Blocks['grid_off'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('Show nothing on')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(120)
      this.setTooltip('Resets the grid for the token, showing nothing.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['grid_off'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendDisplayPatternCmd(' + token + '[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);\n'
    return code
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
      this.setColour(120)
      this.setTooltip('Shows the selected grid.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['show_grid'] = function (block) {
    var grid = Blockly.JavaScript.valueToCode(block, 'GRID', Blockly.JavaScript.ORDER_COMMA)
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendDisplayPatternCmd(' + token + ', ' + grid + ');\n'
    return code
  }

  // Currently not implemented in the hardware, hence not tested and disabled.
  // If you want to enable this block, remember to remove the disabled="true" from utilities/blockly-toolbox.js
  Blockly.Blocks['show_grid_text'] = {
    init: function () {
      this.appendValueInput('TEXT')
          .setCheck('String')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('Show')
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('On')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(120)
      this.setTooltip('Feature currently not available.\n Scrolls through the first 29 letters of the provided text.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['show_grid_text'] = function (block) {
    var string = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA)
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendMatrixTextCmd(' + token + ', ' + string + ');\n'
    return code
  }

  // Currently not implemented in the hardware, hence not tested and disabled.
  // If you want to enable this block, remember to remove the disabled="true" from utilities/blockly-toolbox.js
  Blockly.Blocks['show_grid_count'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('Count On')
      this.appendValueInput('START')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('From')
      this.appendValueInput('STOP')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('To')
      this.appendValueInput('TIME')
          .setCheck('Number')
          .setAlign(Blockly.ALIGN_CENTRE)
          .appendField('With')
      this.appendDummyInput()
        .appendField('Seconds each number')
      this.setInputsInline(true)
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(120)
      this.setTooltip('Feature currently not available.\n Counts on a token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['show_grid_count'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_COMMA)
    var start = Blockly.JavaScript.valueToCode(block, 'START', Blockly.JavaScript.ORDER_COMMA)
    var stop = Blockly.JavaScript.valueToCode(block, 'STOP', Blockly.JavaScript.ORDER_COMMA)
    var seconds = time * 1000
    var code = 'app.sendCountCmd(' + token + ', ' + start + ', ' + stop + ', ' + seconds + ');\n'
    return code
  }

  Blockly.Blocks['get_grid'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Whatever is displayed on')
      this.setOutput(true, 'Grid')
      this.setColour(120)
      this.setTooltip('Returns the Grid currently displayed on a specific token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['get_grid'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.getGrid(' + token + ');\n'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  /*
  * Sector blocks
  * Various blocks relating to sectors.
  */

  // The sector block, with a dropdown list of all sectors defined in the Board Editor
  Blockly.Blocks['sector_sector'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(sectorNames), 'SECTOR')
      this.setOutput(true, 'Sector')
      this.setColour(20)
      this.setTooltip('A sector on the board.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['sector_sector'] = function (block) {
    var sector = block.getFieldValue('SECTOR')
    var code = sectorObject[sector]
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The random sector block chooses a random sector from the sectors defined in the Board Editor
  Blockly.Blocks['sector_random_sector'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Random Sector')
      this.setOutput(true, 'Sector')
      this.setColour(20)
      this.setTooltip('A random sector from the ones used in the Board Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['sector_random_sector'] = function (block) {
    var code = 'app.getRandomSector()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The get sector block returns the sector that a Token is standing on; this is set in the Move block
  Blockly.Blocks['sector_get_sector'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('The sector that')
      this.appendDummyInput()
          .appendField('is standing on')
      this.setOutput(true, 'Sector')
      this.setColour(20)
      this.setTooltip('Returns the sector that a token is currently at.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['sector_get_sector'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.getSector(' + token + ')'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The sector test block checks whether a token is standing on a sector
  // This can also be accomplished with an equality block comparing a sector and a getSector block
  // but this should be more easily understandable since it uses more natural language and fewer blocks
  Blockly.Blocks['sector_test'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
      this.appendValueInput('SECTOR')
          .setCheck('Sector')
          .appendField('is standing on')
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(20)
      this.setTooltip('Checks whether a token is standing on a specific sector.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['sector_test'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
    var code = sector + ' == app.getSector(' + token + ')'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The current sector test blocks works like the sector test block, just without the need to specify a token
  // It just uses the current token instead
  Blockly.Blocks['sector_current_sector_test'] = {
    init: function () {
      this.appendValueInput('SECTOR')
          .setCheck('Sector')
          .appendField('Current token is standing on')
      this.setInputsInline(true)
      this.setOutput(true, 'Boolean')
      this.setColour(20)
      this.setTooltip('Checks whether the current token is standing on a specific sector.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['sector_current_sector_test'] = function (block) {
    var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
    var code = sector + ' == app.getSector(currentToken)'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  /*
  * Token blocks
  * Various blocks relating to tokens.
  */

  // The token block, with a dropdown list of all tokens defined in the Game Assets
  Blockly.Blocks['token_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(TOKENS), 'TOKEN')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('A token, define more in the Token Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_token'] = function (block) {
    var token = block.getFieldValue('TOKEN')
    var code = 'app.getToken("' + token + '")'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The currentToken block, referring to the token that triggered the input within which this block is placed
  Blockly.Blocks['token_current_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Current Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('The token that who triggered the current event.\n Do not use in Set Up the Game.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_current_token'] = function (block) {
    var code = 'currentToken'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // Currently not implemented in the hardware, hence not tested and disabled.
  // If you want to enable this block, remember to remove the disabled="true" from utilities/blockly-toolbox.js
  // The otherToken block is for use in the token-token-interaction block, to refer to the other token there.
  Blockly.Blocks['token_other_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Other Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('Feature currently not available.\n ONLY USE THIS IN Move Token Close to Other Token!\n The token that was moved close to the current token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_other_token'] = function (block) {
    var code = 'otherToken'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // The random token block chooses a random token from the tokens defined in the Game Assets
  Blockly.Blocks['token_random_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Random Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('Randomly selects one of the connected tokens.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_random_token'] = function (block) {
    var code = 'app.getRandomToken()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }

  // the token test block checks whether the current token is a specific token
  Blockly.Blocks['token_test'] = {
    init: function () {
      this.appendValueInput('TOKEN')
          .setCheck('Token')
          .appendField('Current Token is ')
      this.setOutput(true, 'Boolean')
      this.setColour(290)
      this.setTooltip('Checks whether the current token is a specific token.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_test'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_EQUALITY)
    var code = 'currentToken == ' + token
    return [code, Blockly.JavaScript.ORDER_EQUALITY]
  }

  // this sets the token id; which is what most of the other token block use to refer to a token.
  Blockly.Blocks['token_set_id'] = {
    init: function () {
      this.appendDummyInput()
        .appendField('Set token name to: ')
        .appendField(new Blockly.FieldDropdown(TOKENS), 'TOKEN')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(290)
      this.setTooltip('Sets the token name to one of the ones provided in the Token Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['token_set_id'] = function (block) {
    var token = block.getFieldValue('TOKEN')
    var code = 'currentToken.id = (\'' + token + '\')\n'
    return code
  }

  /*
  * Redefined blocks
  * It was necessary to redefine some of the standard Blockly Blocks.
  * What is changed is mostly code generation, not the looks of the blocks
  * Mostly because our code is placed inside an app object, which requires some different syntax
  * The code here is mostly copied from Blocky directly, with only some changes
  * The changes will be annotated
  */

  // The math change block in- or decreases a variable by a number.
  // Here we change both the looks and code generation of a block
  // Okay, so the reason to use a standard block instead of a custom one here is that
  // the standard block is placed in the Variables tab when you create a variable
  // not sure why it's called a math block, since it's in a different category
  // but it does a math function I guess?
  // code generation not taken from blockly
  Blockly.Blocks['math_change'] = {
    init: function () {
      console.warn('=====')
      console.log(this)
      this.appendValueInput('AMOUNT')
          .appendField(new Blockly.FieldDropdown([['Increase', 'INCREASE'], ['Decrease', 'DECREASE']]), 'TYPE')
          .appendField(new Blockly.FieldVariable('score'), 'VAR')
          .appendField('By')
      this.setPreviousStatement(true, null)
      this.setNextStatement(true, null)
      this.setColour(330)
      this.setTooltip('Increases or decreases the selected variable by the provided amount.')
      this.setHelpUrl('')
    }
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

  // The random block provides a random number.
  // We moved the function that creates a random integer into index.html
  // and here just call it via app.mathRandomInt
  // but the function is still taken from blockly
  Blockly.JavaScript['math_random_int'] = function (block) {
    // Random integer between [X] and [Y].
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var code = 'app.mathRandomInt(' + argument0 + ', ' + argument1 + ')'
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }

  // The property block checks whether a number has a certain property
  // The only change here is that functions need a slightly different syntax.
  // instead of 'function myfunction (n) {'
  // we use 'myfunction: function (n) {'
  // other comments kept from blockly
  Blockly.JavaScript['math_number_property'] = function (block) {
    // Check if a number is even, odd, prime, whole, positive, or negative
    // or if it is divisible by certain number. Returns true or false.
    var numberToCheck = Blockly.JavaScript.valueToCode(block, 'numberToCheck',
        Blockly.JavaScript.ORDER_MODULUS) || '0'
    var dropdownProperty = block.getFieldValue('PROPERTY')
    var code
    if (dropdownProperty === 'PRIME') {
      // Prime is a special case as it is not a one-liner test.
      var functionName = Blockly.JavaScript.provideFunction_(
          'mathIsPrime',
        [Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ': function (n) {', // changed syntax
          '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
          '  if (n == 2 || n == 3) {',
          '    return true;',
          '  }',
          '  // False if n is NaN, negative, is 1, or not whole.',
          '  // And false if n is divisible by 2 or 3.',
          '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
          ' n % 3 == 0) {',
          '    return false;',
          '  }',
          '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
          '  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {',
          '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
          '      return false;',
          '    }',
          '  }',
          '  return true;',
          '},'])
      code = functionName + '(' + numberToCheck + ')'
      return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
    }
    switch (dropdownProperty) {
      case 'EVEN':
        code = numberToCheck + ' % 2 == 0'
        break
      case 'ODD':
        code = numberToCheck + ' % 2 == 1'
        break
      case 'WHOLE':
        code = numberToCheck + ' % 1 == 0'
        break
      case 'POSITIVE':
        code = numberToCheck + ' > 0'
        break
      case 'NEGATIVE':
        code = numberToCheck + ' < 0'
        break
      case 'DIVISIBLE_BY':
        var divisor = Blockly.JavaScript.valueToCode(block, 'DIVISOR',
            Blockly.JavaScript.ORDER_MODULUS) || '0'
        code = numberToCheck + ' % ' + divisor + ' == 0'
        break
    }
    return [code, Blockly.JavaScript.ORDER_EQUALITY]
  }

  // the variable getter block returns a variable
  // we added 'app.' due to the context where the code would be placed
  Blockly.JavaScript['variables_get'] = function (block) {
    // Variable getter.
    var code = 'app.' // this adds 'app.' to the code
    code += Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE)
    return [code, Blockly.JavaScript.ORDER_ATOMIC]
  }

  // the variable setter block sets a variable
  // we added 'app.' due to the context where the code would be placed
  Blockly.JavaScript['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0'
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return 'app.' + varName + ' = ' + argument0 + ';\n' // added 'app.'
  }

  // The procedure block defines a function with a return value
  // Because we'd like to be able to use currentToken within a function, this is given as a variable to the function
  Blockly.JavaScript['procedures_defreturn'] = function (block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK')
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      branch = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || ''
    if (returnValue) {
      returnValue = '  return ' + returnValue + ';\n'
    }
    // changes start here
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i - 1],
          Blockly.Variables.NAME_TYPE)
    }
    // changes end here
    var code = funcName + ': function (' + args.join(', ') + ') {\n' +
        branch + returnValue + '},\n'
    code = Blockly.JavaScript.scrub_(block, code)
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.JavaScript.definitions_['%' + funcName] = code
    return null
  }

  // Defining a procedure without a return value uses the same generator as
  // a procedure with a return value.
  // The difference is the function block that is generated from this.
  Blockly.JavaScript['procedures_defnoreturn'] =
      Blockly.JavaScript['procedures_defreturn']

  // added 'app.'
  Blockly.JavaScript['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null'
    }
    var code = 'app.' + funcName + '(' + args.join(', ') + ')' // added 'app.' here
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }
  // added 'app.'
  Blockly.JavaScript['procedures_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null'
    }
    var code = 'app.' + funcName + '(' + args.join(', ') + ');\n' // added 'app.' here
    return code
  }

  /*
  * Non-block code
  * Blockly can add code not directly defined by blocks
  * There is the init function, which runs before the code generation for any blocks run
  * and the finish function, which runs after all the code generation for any blocks has finished
  * Here we add information from the other tabs; the Board Editor and the Game Assets
  * Again, the code here is copied from blockly, which some strategic additions
  */

  // Here we initialise the min_players, max_players, paper_type and hasMoveBlock variables
  // they will be used in the finalise function
  // but can be changed by the code generation from blocks before that
  // specifically the game_init block and the Move block
  Blockly.JavaScript.init = function (workspace) {
    Blockly.JavaScript.min_players = null
    Blockly.JavaScript.max_players = null
    Blockly.JavaScript.paper_type = '1'
    Blockly.JavaScript.hasMoveBlock = false
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

  // Now we come to the finish function.
  // First there are helper functions that are used in finish to write dictionaries and lists
  // These are not taken from blockly
  Blockly.JavaScript.writeDictionary = function (name, dict) {
    var result = name
    result += ': {\n'
    var first = true
    for (var key in dict) {
      if (!first) {
        result += ',\n'
      }
      first = false
      result += '  "' + key + '": "' + dict[key] + '"'
    }
    result += '\n},\n\n\n'
    return result
  }

  Blockly.JavaScript.writeListDictionary = function (name, dict) {
    var result = name
    result += ': {\n'
    var first = true
    for (var key in dict) {
      if (!first) {
        result += ',\n'
      }
      first = false
      result += '  "' + key + '": ' + Blockly.JavaScript.writeList(dict[key])
    }
    result += '\n},\n\n\n'
    return result
  }

  Blockly.JavaScript.writeList = function (list, isStrings) {
    var result = '['
    var first = true
    for (var item in list) {
      if (!first) {
        result += ', '
      }
      first = false
      if (isStrings) {
        result += '"' + list[item] + '"'
      } else {
        result += list[item]
      }
    }
    result += ']'
    return result
  }

  Blockly.JavaScript.writeGridList = function () {
    var list = []
    for (var key in ledGrids) {
      var grid = ledGrids[key]
      console.log(ledGrids[grid])
      var gridlist = []
      for (var i = 0; i < 8; i++) {
        gridlist.push('0x' + grid.substr(i * 2, 2))
      }
      list.push(Blockly.JavaScript.writeList(gridlist, false))
    }
    return Blockly.JavaScript.writeList(list, false)
  }

  Blockly.JavaScript.writeTokenVal = function () {
    var newDict = JSON.parse(JSON.stringify(tokenVal)) // clone tokenVal. Need this workaround because native cloning does not exist in JS
    for (var key in newDict) {
      newDict[key][0] = Blockly.JavaScript.writeList(newDict[key][0], false)
      for (var i = 1; i < newDict[key].length; i++) {
        newDict[key][i] = "'" + newDict[key][i] + "'"
      }
    }
    return Blockly.JavaScript.writeListDictionary('tokenVal', newDict)
  }

  // the finish function
  // added a lot of things in the beginning:
  // the paper type that is used
  // the number of required players
  // a list of the grids defined in the Game Assets
  // a list of the sectors defined in the Board Editor
  // a dictionary of the tokens defined in the Game Assets
  //
  // It then places all the code generated by the blocks inside a function called initiate
  // this function is called in index.html when you start the game
  //
  // If there is no Move block, the game adds relevant code
  // so that tokens still keep track of which sector they're in
  Blockly.JavaScript.finish = function (code) {
    // Sector values to be used for getRandomSector
    let sectorVals = []
    for (let i in sectorObject) {
      sectorVals.push(sectorObject[i])
    }
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
    // changed pretty much everything from here on out
    output += 'paperType: ' + Blockly.JavaScript.paper_type + ',\n\n'
    output += 'requiredPlayers: [' + Blockly.JavaScript.min_players + ', ' + Blockly.JavaScript.max_players + '],\n\n'
    output += 'grids: ' + Blockly.JavaScript.writeGridList() + ',\n\n'
    output += 'sectorVals: ' + Blockly.JavaScript.writeList(sectorVals, true) + ',\n\n'
    output += Blockly.JavaScript.writeTokenVal()
    output += 'requiredPlayers: [null, null],\n'
    output += 'initiate: function() {\n\n'
    output += code
    if (!Blockly.JavaScript.hasMoveBlock) {
      output += '\n'
      output += 'var handleTokenMove = function(currentToken, constraint, options) {\n'
      output += 'currentToken.sector = constraint;\n'
      output += '};\n'
      output += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);\n'
    }
    output += '\n},'
    return output
  }
}

export default blocklyInit
