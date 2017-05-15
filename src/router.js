import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import BoardEditor from 'components/BoardEditor.vue'
import Blockly from 'components/Blockly.vue'
import BlocklyButtons from 'components/BlocklyButtons.vue'
import BoardButtons from 'components/BoardButtons.vue'
import Asset from 'components/Asset.vue'
import AssetButtons from 'components/AssetButtons.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      components: {
        default: Hello
      }
    },
    {
      path: '/board',
      name: 'Board Editor',
      components: {
        default: BoardEditor,
        extras: BoardButtons
      }
    },
    {
      path: '/assets',
      name: 'Asset Collection',
      components: {
        default: Asset,
        extras: AssetButtons
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
