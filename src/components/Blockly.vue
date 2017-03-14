<template>
  <div>
    <div id="blockly-wrapper" style="height: 480px; width: 600px;"></div>
  </div>
</template>
<script>
import Blockly from 'node-blockly/browser'

Blockly.Blocks['move_to'] = {
  init: function () {
    this.appendDummyInput()
        .appendField('Move')
        .appendField(new Blockly.FieldVariable('Piece'), 'PIECE')
        .appendField('To')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COLOR')
    this.setNextStatement(true, null)
    this.setColour(65)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}

export default {
  name: 'blockly',
  data () {
    return {
      workspace: null
    }
  },
  mounted () {
    let toolbox = '<xml>'
    toolbox += '  <block type="controls_if"></block>'
    toolbox += '  <block type="controls_whileUntil"></block>'
    toolbox += '  <block type="text"></block>'
    toolbox += '  <block type="text_print"></block>'
    toolbox += '  <block type="move_to"></block>'
    toolbox += '</xml>'
    this.workspace = Blockly.inject('blockly-wrapper', {toolbox: toolbox})
  }
}
</script>
<style scoped>
</style>
