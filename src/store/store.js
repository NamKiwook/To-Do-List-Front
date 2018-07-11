import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userToken: null,
    currentBoard: null
  },
  actions: {
    async login (store, userInfo) {
      await Axios.post('/api/user/token', {userEmail: userInfo.userEmail, password: userInfo.password}).then(async (res) => {
        await store.commit('login', res.data.token)
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    logout (store) {
      store.commit('logout')
    },
    selectBoard (store, boardId) {
      store.commit('selectBoard', boardId)
    }
  },
  mutations: {
    login (state, token) {
      state.userToken = token
      localStorage.userToken = token
    },
    logout (state) {
      Axios.defaults.headers.common['token'] = undefined
      state.userToken = null
      state.currentBoard = null
      delete localStorage.userToken
      delete localStorage.currentBoard
    },
    selectBoard (state, boardId) {
      state.currentBoard = boardId
      localStorage.currentBoard = boardId
    }
  },
  getters: {
    getToken (state) {
      state.userToken = state.userToken || localStorage.userToken
      return state.userToken
    },
    getCurrentBoard (state) {
      state.currentBoard = state.currentBoard || localStorage.currentBoard
      return state.currentBoard
    }
  }
})

export default store
