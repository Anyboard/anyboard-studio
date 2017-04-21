import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import BoardEditor from 'components/BoardEditor.vue'
import Blockly from 'components/Blockly.vue'
import BlocklyButtons from 'components/BlocklyButtons.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        main: Hello
      }
    },
    {
      path: '/boardeditor',
      name: 'Board Editor',
      components: {
        default: BoardEditor
      }
    },
    {
      path: '/code',
      name: 'Blockly Builder',
      components: {
        default: Blockly,
        extras: BlocklyButtons
      }
    }
  ]
})
