import {colorHexToRGB} from './helpers.js'

const blocklyInit = function (Blockly, TOKENS, GRIDS, sectorObject, sectorNames, tokenVal, ledGrids) {
  Blockly.FieldColour.COLOURS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff']
  Blockly.FieldColour.COLUMNS = 7
  console.log(Blockly)
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
  // TODO Autogenerate this list ?? Maybe
  var NUMBERFIELDS =
    [['Number Field 1', 'number1'],
     ['Number Field 2', 'number2'],
     ['Number Field 3', 'number3']]
  Blockly.Blocks['show_numberfield'] = {
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
      this.setTooltip('Shows the provided number on the selected numberfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  // TODO Autogenerate this list ?? Maybe
  var TEXTFIELDS =
    [['Text Field 1', 'message1'],
     ['Text Field 2', 'message2'],
     ['Text Field 3', 'message3']]
  Blockly.Blocks['show_textfield'] = {
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
      this.setTooltip('Shows the provided number on the selected numberfield on the phone screen.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['set_title'] = {
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
  Blockly.Blocks['move'] = {
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
  var VIBRATIONLENGTHS =
    [['long', '100'],
     ['medium', '30'],
     ['short', '10']]
  Blockly.Blocks['vibrate'] = {
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
  var VIBRATIONPATTERNS =
    [['long', 'patternArray1'],
     ['short', 'patternArray2'],
     ['twice', 'patternArray3'],
     ['my awesome vibration', 'patternArray4']]
  Blockly.Blocks['vibrate_pattern'] = {
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
  Blockly.Blocks['led_on'] = {
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
  Blockly.Blocks['led_off'] = {
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
  var BLINKSPEEDS =
    [['very fast', '10'],
     ['fast', '20'],
     ['slow', '75'],
     ['very slow', '150']]
  Blockly.Blocks['led_blink'] = {
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
  Blockly.Blocks['tap'] = {
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
  Blockly.Blocks['tilt'] = {
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
  Blockly.Blocks['turn'] = {
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
  Blockly.Blocks['shake'] = {
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
  Blockly.Blocks['token_token_interaction'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Move Other Token close to Token')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setColour(65)
      this.setTooltip('Triggered when a token is moved next to another token.')
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
      this.setTooltip('Triggered when a token is doubletapped.')
      this.setHelpUrl('')
    }
  }
  var PLAYERNUM = []
  for (var i = 1; i < 7; i++) {
    PLAYERNUM.push([i.toString()])
  }
  Blockly.Blocks['game_init'] = {
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
      this.setTooltip('This runs at the start of the game. Do not include any currentToken blocks here.')
      this.setHelpUrl('')
    }
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
      this.setTooltip('Scrolls through the first 29 letters of the provided text.')
      this.setHelpUrl('')
    }
  }
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
      this.setTooltip('Counts on a token.')
      this.setHelpUrl('')
    }
  }
  // TODO Autogenerate this list
  /*
  var GRIDS =
    [[{'src': '../assets/smiley.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SMILEY'],
     [{'src': '../assets/x.png', 'width': 16, 'height': 16, 'alt': '*'}, 'X'],
     [{'src': '../assets/square.png', 'width': 16, 'height': 16, 'alt': '*'}, 'SQUARE']]
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
  Blockly.Blocks['token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown(TOKENS), 'TOKEN')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('A token, define more in the Token Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['current_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Current Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('The token that who triggered the current event. Do not use in Set Up the Game.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['other_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Other Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('ONLY USE THIS IN Move Token Close to Other Token! The token that was moved close to the current token.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['random_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Random Token')
      this.setOutput(true, 'Token')
      this.setColour(290)
      this.setTooltip('Randomly selects one of the connected tokens.')
      this.setHelpUrl('')
    }
  }
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
  Blockly.Blocks['set_id'] = {
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
      this.setTooltip('A sector on the board.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['random_sector'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Random Sector')
      this.setOutput(true, 'Sector')
      this.setColour(20)
      this.setTooltip('A random sector from the ones used in the Board Editor.')
      this.setHelpUrl('')
    }
  }
  Blockly.Blocks['get_sector'] = {
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
  Blockly.Blocks['current_sector_test'] = {
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
  Blockly.Blocks['wait'] = {
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
  Blockly.JavaScript['grid_off'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendDisplayPatternCmd(' + token + '[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);\n'
    return code
  }
  Blockly.JavaScript['show_grid'] = function (block) {
    var grid = Blockly.JavaScript.valueToCode(block, 'GRID', Blockly.JavaScript.ORDER_COMMA)
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendDisplayPatternCmd(' + token + ', ' + grid + ');\n'
    return code
  }
  Blockly.JavaScript['show_grid_text'] = function (block) {
    var string = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA)
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_COMMA)
    var code = 'app.sendMatrixTextCmd(' + token + ', ' + string + ');\n'
    return code
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
  Blockly.JavaScript['random_grid'] = function (block) {
    var code = 'app.getRandomGrid()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['get_grid'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.getGrid(' + token + ');\n'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['token'] = function (block) {
    var token = block.getFieldValue('TOKEN')
    var code = 'app.getToken("' + token + '")'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['current_token'] = function (block) {
    var code = 'currentToken'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['other_token'] = function (block) {
    var code = 'otherToken'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['token_test'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_EQUALITY)
    var code = 'currentToken.id == ' + token
    return [code, Blockly.JavaScript.ORDER_EQUALITY]
  }
  Blockly.JavaScript['random_token'] = function (block) {
    var code = 'app.getRandomToken()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['sector'] = function (block) {
    var sector = block.getFieldValue('SECTOR')
    var constr = sectorObject[sector]
    var code = constr
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['random_sector'] = function (block) {
    var code = 'app.getRandomSector()'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['get_sector'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.getSector(' + token + ')'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['sector_test'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
    var code = sector + ' == app.getSector(' + token + ')'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE]
  }
  Blockly.JavaScript['current_sector_test'] = function (block) {
    var sector = Blockly.JavaScript.valueToCode(block, 'SECTOR', Blockly.JavaScript.ORDER_EQUALITY)
    var code = sector + ' == app.getSector(currentToken)'
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE]
  }
  Blockly.JavaScript['vibrate'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var length = block.getFieldValue('LENGTH')
    var code = 'app.sendVibrationCmd(' + token + ', ' + length + ');\n'
    return code
  }
  Blockly.JavaScript['vibrate_pattern'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var pattern = block.getFieldValue('PATTERN')
    var code = 'app.sendVibrationPatternCmd(' + token + ', ' + pattern + ');\n'
    return code
  }
  Blockly.JavaScript['led_on'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var color = block.getFieldValue('COLOR')
    var led = colorHexToRGB(color)
    var code = 'app.sendLedOnCmd(' + token + ', [' + led + ']);\n'
    return code
  }
  Blockly.JavaScript['led_off'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.sendLedOnCmd(' + token + ', [0, 0, 0]);\n'
    return code
  }
  Blockly.JavaScript['led_blink'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var time = Blockly.JavaScript.valueToCode(block, 'TIME', Blockly.JavaScript.ORDER_COMMA)
    var period = block.getFieldValue('SPEED')
    var code = 'app.sendLedBlinkCmd(' + token + ', ' + time + ', ' + period + ');\n'
    return code
  }
  Blockly.JavaScript['move'] = function (block) {
    Blockly.JavaScript.hasMoveBlock = true
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenMove = function(currentToken, constraint, options) {\n'
    code += 'currentToken.sector = constraint;\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenConstraintEvent("MOVE_TO", handleTokenMove);\n'
    return code
  }
  Blockly.JavaScript['tap'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTap = function(currentToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TAP", handleTokenTap);\n'
    return code
  }
  Blockly.JavaScript['double_tap'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenDoubleTap = function(currentToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("DOUBLE_TAP", handleTokenDoubleTap);\n'
    return code
  }
  Blockly.JavaScript['tilt'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTilt = function(currentToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TILT", handleTokenTilt);\n'
    return code
  }
  Blockly.JavaScript['turn'] = function (block) {
    var stack1 = Blockly.JavaScript.statementToCode(block, 'STACK1')
    var stack2 = Blockly.JavaScript.statementToCode(block, 'STACK2')
    var code = 'var handleTokenTurn = function(currentToken , direction , options) {\n'
    code += 'if (direction == 1) {\n'
    code += stack1
    code += '} else {\n'
    code += stack2
    code += '};\n'
    code += '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("ROTATE", handleTokenTurn);\n'
    return code
  }
  Blockly.JavaScript['shake'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenShake = function(currentToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("SHAKE", handleTokenShake);\n'
    return code
  }
  Blockly.JavaScript['token_token_interaction'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTokenInteraction = function(currentToken , otherToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TTE", handleTokenTokenInteraction);\n'
    return code
  }
  Blockly.JavaScript['game_init'] = function (block) {
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
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var seconds = Blockly.JavaScript.valueToCode(block, 'SECONDS', Blockly.JavaScript.ORDER_ATOMIC)
    var milliseconds = seconds * 1000
    var code = 'setTimeout(function () {\n'
    code += stack
    code += '}, ' + milliseconds + ');\n'
    return code
  }
  Blockly.JavaScript['set_title'] = function (block) {
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
    return '$(\'#title\').html(' + msg + ');\n'
  }
  Blockly.JavaScript['show_text'] = function (block) {
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_NONE) || '\'\''
    var field = block.getFieldValue('FIELD')
    return '$(\'#' + field + '\').html(' + msg + ');\n'
  }
  Blockly.JavaScript['show_textfield'] = function (block) {
    var type = block.getFieldValue('TYPE')
    var field = block.getFieldValue('FIELD')
    var truth = (type === 'SHOW')
    if (truth) {
      return '$(\'#' + field + '\').show();\n'
    } else {
      return '$(\'#' + field + '\').hide();\n'
    }
  }
  Blockly.JavaScript['show_number'] = function (block) {
    var num = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_NONE) || '\'\''
    var field = block.getFieldValue('FIELD')
    return '$(\'#' + field + '\').html(' + num + ');\n'
  }
  Blockly.JavaScript['show_numberfield'] = function (block) {
    var type = block.getFieldValue('TYPE')
    var field = block.getFieldValue('FIELD')
    var truth = (type === 'SHOW')
    if (truth) {
      return '$(\'#' + field + '\').show();\n'
    } else {
      return '$(\'#' + field + '\').hide();\n'
    }
  }
  Blockly.JavaScript['set_id'] = function (block) {
    // var text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_EQUALITY)
    var token = block.getFieldValue('TOKEN')
    var code = 'currentToken.id = (\'' + token + '\')\n'
    return code
  }
  Blockly.JavaScript['math_random_int'] = function (block) {
    // Random integer between [X] and [Y].
    var argument0 = Blockly.JavaScript.valueToCode(block, 'FROM',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var argument1 = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_COMMA) || '0'
    var code = 'app.mathRandomInt(' + argument0 + ', ' + argument1 + ')'
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }
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
        [Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + ': function (n) {',
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
  Blockly.JavaScript['variables_get'] = function (block) {
    // Variable getter.
    var code = 'app.'
    code += Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE)
    return [code, Blockly.JavaScript.ORDER_ATOMIC]
  }
  Blockly.JavaScript['variables_set'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0'
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)
    return 'app.' + varName + ' = ' + argument0 + ';\n'
  }
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
  /* var tilesdict = {
    'key1': 'value1',
    'key2': 'value2',
    'key3': 'value3'
  } */
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
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],
          Blockly.Variables.NAME_TYPE)
    }
    var code = funcName + ': function (' + args.join(', ') + ') {\n' +
        branch + returnValue + '},\n'
    code = Blockly.JavaScript.scrub_(block, code)
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.JavaScript.definitions_['%' + funcName] = code
    return null
  }
  // Defining a procedure without a return value uses the same generator as
  // a procedure with a return value.
  Blockly.JavaScript['procedures_defnoreturn'] =
      Blockly.JavaScript['procedures_defreturn']
  Blockly.JavaScript['procedures_callreturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null'
    }
    var code = 'app.' + funcName + '(' + args.join(', ') + ')'
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL]
  }
  Blockly.JavaScript['procedures_callnoreturn'] = function (block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE)
    var args = ['currentToken']
    for (var i = 1; i <= block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null'
    }
    var code = 'app.' + funcName + '(' + args.join(', ') + ');\n'
    return code
  }
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
    // output += Blockly.JavaScript.writeDictionary('tiles', tilesdict)
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
