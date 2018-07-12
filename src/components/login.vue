<template>
  <v-content class="board">
    <v-container fill-height>
      <v-layout align-center fill-height >
        <v-flex xl4 lg6 md8 sm8 cs12 offset-xl4 offset-lg3 offset-md2 offset-sm2>
          <v-card>
            <v-card-title>
              <div :style="{width:'100%', textAlign : 'center', fontSize : '30px'}">Login</div>
            </v-card-title>
            <v-card-actions class="py-0 mx-3">
              <v-text-field label="Email" type="email" v-model="userEmail"></v-text-field>
            </v-card-actions>
            <v-card-actions class="py-0 mx-3" >
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            </v-card-actions>
            <v-card-actions class="mx-3 pb-3">
              <v-spacer></v-spacer>
              <router-link to="/signup">Create Account</router-link>
              <v-btn class="ml-4" @click="login">LOGIN</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      userEmail: '',
      password: ''
    }
  },
  created () {
    this.$store.dispatch('logout')
  },
  methods: {
    async login () {
      await this.$store.dispatch('login', {userEmail: this.userEmail, password: this.password})
      if (this.$store.getters.getToken) this.$router.push('/board')
    }
  }
}
</script>

<style scoped>

</style>
