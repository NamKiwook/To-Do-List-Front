<template>
  <v-content class="board">
    <v-container grid-list-md fluid>
      <v-layout align-start row >
        <v-card color="grey darken-3" class="white--text card" width="300" v-for="card in board.card" :key="card._id">
          <v-card-title :style="{padding: 0, margin: 0}">
            <v-spacer></v-spacer>
            <v-btn icon ml-5>
              <v-icon>menu</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text :style="{paddingTop: 0}">
            <v-textarea :value=card.name auto-grow hide-details rows="1" :style="{marginTop: 0}"></v-textarea>
          </v-card-text>
          <v-flex v-for="list in card.list" :key="list._id">
            <v-card color="grey darken-2">
              <v-card-text>
                <span>{{list.name}}</span>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-card-actions :style="{paddingTop: 0}">
            <v-spacer></v-spacer>
            <v-btn flat dark>add Card</v-btn>
          </v-card-actions>
        </v-card>
        <v-flex>
          <div>
            <v-btn color="grey darken-3" dark large:style="{margin: 0}">add List</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'board',
  data: () => ({
    board: []
  }),
  computed: {
    currentBoard () {
      return this.$store.getters.getCurrentBoard
    }
  },
  watch: {
    currentBoard (data) {
      this.board = []
      this.$axios.get('/api/board', {params: {boardId: data}}).then((res) => {
        this.board = res.data
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    }
  }
}
</script>

<style scoped>
  .board {
    height: 100%;
    overflow: auto;
  }
  .card {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
