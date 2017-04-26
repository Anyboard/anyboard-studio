const blocklyInit = function (Blockly, TOKENS, sectorObject, sectorNames, tokenVal) {
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
      this.setTooltip('')
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
  Blockly.Blocks['set_title'] = {
    init: function () {
      this.appendValueInput('TEXT')
          .setCheck('String')
          .appendField('Set Game Title to')
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
      this.setTooltip('')
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
      this.setColour(120)
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
  Blockly.Blocks['other_token'] = {
    init: function () {
      this.appendDummyInput()
          .appendField('Other Token')
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
      this.setColour(290)
      this.setTooltip('')
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
          .appendField('The sector that')
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
      this.setColour(20)
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
          .appendField('Seconds then do')
      this.appendStatementInput('STACK')
          .setCheck(null)
      this.setPreviousStatement(true, null)
      this.setColour(255)
      this.setTooltip('')
      this.setHelpUrl('')
    }
  }
  Blockly.JavaScript['grid'] = function (block) {
    var dropdownGrid = block.getFieldValue('GRID')
    var code = dropdownGrid
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
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['get_grid'] = function (block) {
    var token = Blockly.JavaScript.valueToCode(block, 'TOKEN', Blockly.JavaScript.ORDER_FUNCTION_CALL)
    var code = 'app.getGrid(' + token + ');\n'
    return [code, Blockly.JavaScript.ORDER_MEMBER]
  }
  Blockly.JavaScript['token'] = function (block) {
    var token = block.getFieldValue('TOKEN')
    var code = '\'' + token + '\''
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
  Blockly.JavaScript['token_token_interaction'] = function (block) {
    var stack = Blockly.JavaScript.statementToCode(block, 'STACK')
    var code = 'var handleTokenTokenInteraction = function(currentToken , otherToken , options) {\n'
    code += stack + '};\n'
    code += 'AnyBoard.TokenManager.onTokenEvent("TTE", handleTokenTokenInteraction);\n'
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
  Blockly.JavaScript.writeList = function (list) {
    var result = '['
    var first = true
    for (var item in list) {
      if (!first) {
        result += ', '
      }
      first = false
      result += '"' + list[item] + '"'
    }
    result += ']'
    return result
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
    output += 'sectorVals: ' + Blockly.JavaScript.writeList(sectorVals) + ',\n\n'
    output += Blockly.JavaScript.writeListDictionary('tokenVal', tokenVal)
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
