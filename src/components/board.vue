<template>
  <v-content class="board">
    <v-container grid-list-md fluid>
      <v-layout v-if="currentBoardId" align-start row >
        <v-card color="grey darken-3" class="white--text card" width="300" v-for="card in board.card" :key="card._id">
          <v-dialog v-model="listDialog" persistent max-width="550">
            <v-card>
              <v-card-title class="headline">추가하고 싶은 리스트의 이름이 무엇인가요?</v-card-title>
              <v-card-text :style="{paddingTop: 0}">
                <v-textarea v-model="addListName" auto-grow hide-details rows="1" :style="{marginTop: 0}"></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-3" dark flat @click="closeDialog">CANCEL</v-btn>
                <v-btn dark flat @click="addList">ADD</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card-title :style="{padding: 0, margin: 0}">
            <v-spacer></v-spacer>
            <v-menu bottom left transition="slide-y-transition">
              <v-btn
                slot="activator"
                icon
              >
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list light dense>
                <v-list-tile @click="deleteCard(card)">
                  <v-list-tile-title>Delete</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-card-title>
          <v-card-text :style="{paddingTop: 0}">
            <v-textarea v-model="card.name" auto-grow hide-details rows="1" :style="{marginTop: 0}"></v-textarea>
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
            <v-btn flat dark @click="openAddListDialog(card)">add List</v-btn>
          </v-card-actions>
        </v-card>
        <v-flex>
          <div>
            <v-btn  color="grey darken-3" dark large :style="{margin: 0}" @click="openAddCardDialog">add Card</v-btn>
            <v-dialog v-model="cardDialog" persistent max-width="550">
              <v-card>
                <v-card-title class="headline">추가하고 싶은 카드의 이름이 무엇인가요?</v-card-title>
                <v-card-text :style="{paddingTop: 0}">
                  <v-textarea v-model="addCardName" auto-grow hide-details rows="1" :style="{marginTop: 0}"></v-textarea>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-3" dark flat @click="closeDialog">CANCEL</v-btn>
                  <v-btn dark flat @click="addCard">ADD</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-flex>
      </v-layout>
      <v-card v-else color="grey darken-2">
        <v-card-text>
          <span>보드를 선택해주세요.</span>
        </v-card-text>
        <v-card-text>
          <span>보드가 없다면 만들어보세요.</span>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'board',
  data: () => ({
    board: {name: null, card: []},
    addCardName: '',
    addListName: '',
    selectCard: null,
    cardDialog: false,
    listDialog: false
  }),
  computed: {
    currentBoardId () {
      return this.$store.getters.getCurrentBoardId
    }
  },
  watch: {
    currentBoardId (data) {
      this.board = {name: null, card: []}
      if (!this.currentBoardId) return
      this.$axios.get('/api/board', {params: {boardId: data}}).then((res) => {
        this.board = res.data
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    }
  },
  methods: {
    deleteCard (card) {
      this.board.card.splice(this.board.card.indexOf(card), 1)
      this.modifyBoard()
    },
    addList () {
      this.selectCard.list.push({name: this.addListName})
      this.modifyBoard()
      this.closeDialog()
    },
    addCard () {
      this.board.card.push({name: this.addCardName, list: []})
      this.modifyBoard()
      this.closeDialog()
    },
    modifyBoard () {
      this.$axios.put('/api/board', {boardId: this.board._id, name: this.board.name, card: this.board.card}).then((res) => {
        this.board = res.data
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    loadBoard (boardId) {
      this.$axios.get('/api/board', {params: {boardId: boardId}}).then((res) => {
        return res.data
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    },
    openAddListDialog (card) {
      this.selectCard = card
      this.listDialog = true
    },
    openAddCardDialog () {
      this.cardDialog = true
    },
    closeDialog () {
      this.addCardName = ''
      this.addListName = ''
      this.cardDialog = false
      this.listDialog = false
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
