<template>
  <div id="app">
    <v-app id="inspire" dark>
      <v-navigation-drawer
        clipped
        fixed
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon>settings</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
      </v-toolbar>
      <v-content class="board">
        <v-container grid-list-md fluid>
          <v-layout align-start row >
            <v-flex v-for="content in contents">
              <v-card color="grey darken-3" class="white--text" width="300">
                <v-card-title :style="{padding : 0, margin : 0}">
                  <v-spacer></v-spacer>
                  <v-btn icon ml-5>
                    <v-icon>menu</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text :style="{paddingTop : 0}">
                  <v-textarea :value=content.title auto-grow hide-details rows="1" :style="{marginTop : 0}"></v-textarea>
                </v-card-text>
                <v-flex v-for="subContent in content.subTitle">
                  <v-card color="grey darken-2">
                    <v-card-text>
                      <span>{{subContent}}</span>
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-card-actions :style="{paddingTop : 0}">
                  <v-spacer></v-spacer>
                  <v-btn flat dark>add Card</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex>
              <div>
                <v-btn color="grey darken-3" dark large :style="{margin : 0}">add List</v-btn>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer app fixed>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({
    drawer: true,
    contents:[
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to yoe and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artists and albums wheneine and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artistand wherever, online and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artis online and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artists and albums whenever and wherever, online and offline.',
      },
      {
        title : 'Unlimited music ddddddddddddddddddddddddddddddddnow',
        subTitle : 'Listen to your favorite artist s1222222222222222222 22222222222222222 2222222222222 222222222222 222222222 and albums whenever and wherever, online and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artists and 2311111111111111111111111111111 1111111111111111111111111111111111111111111111111 1111111111111111111111111111111111 11111111111111111111111111111111111111111111111 whenever and wherever, online and offline.',
      },
      {
        title : 'Unlimited music now',
        subTitle : 'Listen to your favorite artists and 231111 1111111111111111111111111111111111111111111111111111111 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111 whenever and wherever, online and offline.',
      }
    ]
  }),
  props: {
    source: String
  }
}
</script>

<style>
  .board {
    height: 100%;
    overflow: auto;
  }
</style>
