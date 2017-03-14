import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Blockly from 'components/Blockly'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
