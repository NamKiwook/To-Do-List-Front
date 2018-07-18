import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/store'
import board from '../components/board'
import nav from '../components/nav'
import login from '../components/login'
import signup from '../components/signup'
import axios from 'axios'

Vue.use(Router)

function requireAuth (from, to, next) {
  if (Store.getters.getToken) {
    axios.defaults.headers.common['token'] = Store.getters.getToken
    return next()
  }
  alert('로그인해주세요.')
  next('/')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/board',
      name: 'Board',
      components: {
        nav: nav,
        content: board
      },
      beforeEnter: requireAuth
    },
    {
      path: '/',
      name: 'Login',
      components: {
        content: login
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      components: {
        content: signup
      }
    }

  ]
})
