import Vue from 'vue'
import Router from 'vue-router'
import board from '../components/board'
import nav from '../components/nav'
import login from '../components/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/board',
      name: 'Board',
      components: {
        nav : nav,
        content : board
      }
    },
    {
      path: '/',
      name: 'Login',
      components: {
        content : login
      }
    }
  ]
})
