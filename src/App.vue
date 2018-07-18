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
  ::-webkit-scrollbar {
    width: 0px;
    height: 6px;
    background-color: #BDBDBD;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #424242;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #BDBDBD;
  }
</style>
