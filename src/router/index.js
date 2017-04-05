import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Blockly from 'components/Blockly'
import BoardEditor from 'components/BoardEditor'
import TokenEditor from 'components/TokenEditor'
import DisplayEditor from 'components/DisplayEditor'

Vue.use(Router);

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
    },
    {
      path: '/tokenEditor',
      name: 'tokenEditor',
      component: TokenEditor
    },
    {
      path: '/displayEditor',
      name: 'displayEditor',
      component: DisplayEditor
    }

  ]
})
