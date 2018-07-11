<template>
  <header>
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-tile @click="selectBoard(board)" v-for="board in boards" :key="board._id">
          <v-list-tile-action>
            <v-icon v-if="currentBoard === board._id">radio_button_checked</v-icon>
            <v-icon v-else>radio_button_unchecked</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{board.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-if="currentBoardName === ''">{{userName}}'s Board</v-toolbar-title>
      <v-toolbar-title v-else>{{currentBoardName}}</v-toolbar-title>
    </v-toolbar>
  </header>
</template>

<script>
export default {
  name: 'nav',
  data: () => {
    return {
      drawer: false,
      boards: [],
      userEmail: '',
      userName: '',
      currentBoardName: ''
    }
  },
  created () {
    this.$axios.get('/api/me').then((res) => {
      this.userEmail = res.data.userEmail
      this.userName = res.data.userName
      this.boards = res.data.boards
    })
  },
  computed: {
    currentBoard () {
      return this.$store.getters.getCurrentBoard
    }
  },
  methods: {
    selectBoard (board) {
      this.$store.dispatch('selectBoard', board._id)
      this.currentBoardName = board.name
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
