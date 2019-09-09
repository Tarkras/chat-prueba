<template>
  <v-app>
    <!-- ** Navigation bar with the log out button when you are logged in. ** -->
    <v-app-bar app dense dark>
      <v-avatar size="36">
        <v-img v-bind:src="image" contain></v-img>
      </v-avatar>
      <v-toolbar-title class="ml-2">Welcome to ChatRooms!</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="this.$store.getters.getComponent == 'app-logged'"
        tile
        outlined
        v-on:click="signOut"
      >Log Out</v-btn>
    </v-app-bar>
    <v-content style="padding-top: 48px">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { au } from "./db";
export default {
  components: {
    //
  },
  data: () => ({
    image: require("./assets/chat-logo.png")
  }),
  methods: {
    signOut() {
      au.signOut().then(() => {
        alert("You signed out successfully, \n We hope to see you soon :)");
        this.$store.commit("setComponent", "app-starter");
      });
    }
  }
};
</script>
