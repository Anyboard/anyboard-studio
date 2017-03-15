import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Blockly from 'components/Blockly'
import BoardEditor from 'components/BoardEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BoardEditor',
      component: BoardEditor
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/blockly',
      name: 'Blockly',
      component: Blockly
    }
  ]
})
