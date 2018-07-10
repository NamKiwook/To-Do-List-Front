import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userToken: null
  },
  actions: {
    async login (store, payload) {
      await axios.post('/api/user/token', {userEmail: payload.userEmail, password: payload.password}).then(async (res) => {
        await store.commit('login', res.data.token)
      }).catch((err) => {
        console.log(err.response.data.errorMessage)
      })
    },
    logout (store) {
      store.commit('logout')
    }
  },
  mutations: {
    login (state, token) {
      state.userToken = token
      localStorage.userToken = token
    },
    logout (state) {
      axios.defaults.headers.common['token'] = undefined
      state.userToken = null
      delete localStorage.userToken
    }
  },
  getters: {
    getToken (state) {
      state.userToken = state.userToken || localStorage.userToken
      return state.userToken
    }
  }
})

export default store
