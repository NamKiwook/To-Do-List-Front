<template>
  <v-content class="board">
    <v-container fill-height>
      <v-layout align-center fill-height >
        <v-flex xl4 lg6 md8 sm8 cs12 offset-xl4 offset-lg3 offset-md2 offset-sm2>
          <v-card>
            <v-card-title>
              <div :style="{width:'100%', textAlign : 'center', fontSize : '30px'}">Sign Up</div>
            </v-card-title>
            <v-card-actions class="py-0 mx-3">
              <v-text-field v-model="userName" label="Name"></v-text-field>
            </v-card-actions>
            <v-card-actions class="py-0 mx-3">
              <v-text-field v-model="userEmail" label="Email" type="email"></v-text-field>
            </v-card-actions>
            <v-card-actions class="py-0 mx-3" >
              <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            </v-card-actions>
            <v-card-actions class="mx-3 pb-3">
              <v-spacer></v-spacer>
              <v-btn class="ml-4" @click="signUp">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'signup',
  data: () => ({
    userEmail: '',
    userName: '',
    password: ''
  }),
  methods: {
    signUp () {
      this.$axios.post('/api/user',{userEmail: this.userEmail, userName: this.userName, password: this.password}).then((res) => {
        alert('가입이 되셨습니다. 환영합니다.')
        this.$router.push('/')
      }).catch((err) => {
        alert(err.response.data.errorMessage)
      })
    }
  }
}
</script>

<style scoped>

</style>
