<template>
  <header>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      :style="{paddingBottom: 0}"
    >
      <v-list dense>
        <v-list-tile @click="selectBoard(board)" v-for="board in boards" :key="board._id" avatar>
          <v-list-tile-avatar>
            <v-icon v-if="currentBoardId === board._id">radio_button_checked</v-icon>
            <v-icon v-else>radio_button_unchecked</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{board.name}}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="deleteBoard(board)">
              <v-icon>clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :style="{marginTop: '10px', marginBottom: '10px'}"></v-divider>
        <v-list-tile @click="openAddDialog">
          <v-list-tile-avatar>
            <v-icon>add</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Add Board</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-avatar>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="currentBoardName">{{currentBoardName}}</v-toolbar-title>
      <v-toolbar-title v-else>{{userName}}'s Board</v-toolbar-title>
    </v-toolbar>

    <v-dialog v-model="addDialog" persistent max-width="550">
      <v-card>
        <v-card-title class="headline">추가하고 싶은 보드의 이름이 무엇인가요?</v-card-title>
        <v-card-text :style="{paddingTop: 0}">
          <v-textarea v-model="addBoardName" auto-grow hide-details rows="1" :style="{marginTop: 0}"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-3" dark flat @click="closeDialog">CANCEL</v-btn>
          <v-btn dark flat @click="addBoard">ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </header>
</template>

<script>
export default {
  name: 'nav',
  data: () => {
    return {
      drawer: true,
      boards: [],
      userEmail: '',
      userName: '',
      addBoardName: '',
      addDialog: false
    }
  },
  created () {
    this.loadMyInfo()
  },
  computed: {
    currentBoardId () {
      return this.$store.getters.getCurrentBoardId
    },
    currentBoardName () {
      return this.$store.getters.getCurrentBoardName
    }
  },
  methods: {
    deleteBoard (board) {
      this.$axios.delete('/api/board', {data: {boardId: board._id}}).then(() => {
        if (this.currentBoardId === board._id) {
          this.$store.dispatch('destroyCurrentBoard')
        }
        this.boards.splice(this.boards.indexOf(board), 1)
        this.loadMyInfo()
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    loadMyInfo () {
      this.$axios.get('/api/me').then((res) => {
        this.userEmail = res.data.userEmail
        this.userName = res.data.userName
        this.boards = res.data.boards
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    openAddDialog () {
      this.addDialog = true
    },
    closeDialog () {
      this.addBoardName = ''
      this.addDialog = false
    },
    addBoard () {
      this.$axios.post('/api/board', {name: this.addBoardName}).then((res) => {
        this.selectBoard(res.data)
        this.loadMyInfo()
        this.closeDialog()
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    selectBoard (board) {
      this.$store.dispatch('selectBoard', board)
      this.drawer = false
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none
  }
</style>
