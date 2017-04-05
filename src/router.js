import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import FabricInspector from 'components/fabricinspector/FabricInspector.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/fabricinspector',
      name: 'FabricInspector',
      component: FabricInspector
    }
  ]
})
