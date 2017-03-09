import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import BoardEditor from 'components/BoardEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/BoardEditor',
      name: 'BoardEditor',
      component: BoardEditor
    }
  ]
})
