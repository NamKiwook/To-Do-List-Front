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
              <v-text-field label="Name"></v-text-field>
            </v-card-actions>
            <v-card-actions class="py-0 mx-3">
              <v-text-field label="Email" type="email"></v-text-field>
            </v-card-actions>
            <v-card-actions class="py-0 mx-3" >
              <v-text-field label="Password" type="password"></v-text-field>
            </v-card-actions>
            <v-card-actions class="mx-3 pb-3">
              <v-spacer></v-spacer>
              <v-btn class="ml-4">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'signup'
}
</script>

<style scoped>

</style>
