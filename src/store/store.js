import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userToken: null,
    currentBoard: {_id: null, name: null}
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
    selectBoard (store, board) {
      store.commit('selectBoard', board)
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
      state.currentBoard = {_id: null, name: null}
      delete localStorage.userToken
    },
    selectBoard (state, board) {
      state.currentBoard = board
    }
  },
  getters: {
    getToken (state) {
      state.userToken = state.userToken || localStorage.userToken
      return state.userToken
    },
    getCurrentBoardId (state) {
      return state.currentBoard._id
    },
    getCurrentBoardName (state) {
      return state.currentBoard.name
    }
  }
})

export default store
