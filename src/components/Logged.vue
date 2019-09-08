<template>
  <v-layout align-center justify-center>
    <v-container fill-height>
      <v-card width="100%" height="540px">
        <v-row no-gutters>
          <v-col cols="12">
            <v-app-bar light class="grey lighten-1">
              <v-btn text outlined @click="handler">
                <v-icon left>mdi-message-text</v-icon>Create chat
              </v-btn>
            </v-app-bar>
          </v-col>
          <v-col cols="3" class="pa-0">
            <v-card height="476px" max-height="100%"></v-card>
          </v-col>
          <v-col cols="9" class="pa-0">
            <v-card height="406px"></v-card>
            <v-card></v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        clipped
      ></v-navigation-drawer>
    </v-container>
  </v-layout>
</template>

<script>
import { db, au } from "../db";

export default {
  data() {
    return {
      drawer: false,
      dbUsers: "",
      otherUsers: []
    };
  },
  methods: {
    handler() {
      this.drawer = true;
      this.currentUsers();
    },
    currentUsers() {
      let yourUser = au.currentUser.uid;
      db.ref("users").on("value", data => {
        this.dbUsers = Object.values(data.val());
      });
      console.log(this.dbUsers);
      let a = 0;
      for (let i = 0; i < this.dbUsers.length; i++) {
        if (this.dbUsers[i].uid != yourUser) {
          this.otherUsers[a] = this.dbUsers[i];
          a++;
        }
      }
      console.log(this.otherUsers);
    }
  }
};
</script>

<style scoped>
.v-btn--outlined {
  border-width: 4px;
}
</style>
