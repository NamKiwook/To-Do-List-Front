<template>
  <div id="app">
    <v-app id="inspire" dark>
      <router-view name="nav"></router-view>
      <router-view name="content"></router-view>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
</style>
