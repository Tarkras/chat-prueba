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
            <v-card height="476px" max-height="100%" class="scrollbar">
              <v-list v-for="(room, index) in rooms" :key="index">
                <v-row no-gutters>
                  <v-col cols="9">
                    <v-list-item-group active-class>
                      <v-list-item @click="changeRoom(index)">
                        <v-avatar size="36">
                          <v-img :src="room.photo"></v-img>
                        </v-avatar>
                        <v-list-item-content>
                          <v-list-item-title class="ml-2 font-weight-bold">{{
                            room.name
                          }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-col>
                  <v-col cols="3" align-self="center">
                    <v-btn
                      tile
                      outlined
                      x-small
                      color="error"
                      class="v-btn-outlined-exception"
                      @click="deleteChat(index)"
                      >Delete</v-btn
                    >
                  </v-col>
                </v-row>
                <v-divider class="mx-3"></v-divider>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="9" class="pa-0">
            <v-card height="396px" class="scrollbar" id="scrollable">
              <div v-for="(message, index) in messages" :key="index">
                <v-divider class="mx-3"></v-divider>
                <v-container class="px-5">
                  <v-row>
                    <v-col cols="1">
                      <v-avatar size="40">
                        <v-img
                          v-if="yourUser.uid == message.uid"
                          :src="yourUser.photo"
                        ></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="pr-5" cols="11">
                      <v-row>
                        <span
                          class="font-weight-bold"
                          v-if="yourUser.uid == message.uid"
                          >{{ yourUser.nombre }}</span
                        >
                      </v-row>
                      <v-row>
                        <span class="caption">{{ message.date }}</span>
                      </v-row>
                      <v-row>
                        <span class="mt-2">{{ message.message }}</span>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
            <v-card height="80px" color="grey lighten-2">
              <v-card-actions class="px-0">
                <v-row no-gutters justify="center">
                  <v-col cols="9">
                    <v-textarea
                      v-model="text"
                      class="mt-1"
                      label="Welcome! :)"
                      solo
                      background-color="amber lighten-4"
                      clearable
                      no-resize
                      rows="2"
                      height="60"
                    ></v-textarea>
                  </v-col>
                  <v-col class="ml-5 mt-2" cols="1">
                    <v-btn fab outlined color="primary" @click="sendMessage">
                      <v-img src="../assets/send.svg"></v-img>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-navigation-drawer v-model="drawer" absolute temporary clipped>
        <v-row justify="center">
          <v-col cols="1" align-self="center">
            <v-avatar size="36">
              <v-img src="../assets/baseline_account_circle_black.png"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="6">
            <v-subheader class="display-1 font-weight-bold">Users</v-subheader>
          </v-col>
          <v-col cols="2" align-self="center">
            <v-btn icon x-small color="error" @click="drawer = !drawer">
              <v-img src="../assets/clear.svg"></v-img>
            </v-btn>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <v-list v-for="(user, index) in otherUsers" :key="user.uid">
          <v-list-item>
            <v-avatar size="36">
              <v-img :src="user.photo"></v-img>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title class="ml-2 font-weight-bold">{{
                user.nombre
              }}</v-list-item-title>
            </v-list-item-content>
            <v-btn
              tile
              outlined
              x-small
              color="success"
              class="v-btn-outlined-exception"
              @click="createChat(index)"
              >Create</v-btn
            >
          </v-list-item>
          <v-divider class="mx-3"></v-divider>
        </v-list>
      </v-navigation-drawer>
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
      yourUser: "",
      otherUsers: [],
      rooms: "",
      uid: "",
      text: "",
      othUid: "",
      messages: "",
      yourMessage: ""
    };
  },
  beforeMount() {
    this.uid = au.currentUser.uid;
    this.currentUsers();
    this.chatCreated();
  },
  created() {
    this.getMessage();
  },
  updated() {
    this.scrollToEnd();
  },
  mounted() {
    this.scrollToEnd();
  },
  methods: {
    handler() {
      this.drawer = true;
      this.currentUsers();
    },
    currentUsers() {
      let yourUser = this.uid;
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
        if (this.dbUsers[i].uid == yourUser) {
          this.yourUser = this.dbUsers[i];
        }
      }
      this.$store.commit("setUsers", this.otherUsers);
      console.log("User:" + this.yourUser);
      console.log(this.otherUsers);
    },
    createChat(index) {
      let othUser = this.otherUsers[index];
      console.log(index);
      let chat = db
        .ref()
        .child("users")
        .child(this.yourUser.uid)
        .child("rooms");

      chat
        .child(this.yourUser.uid + "-" + othUser.uid + "/name")
        .set(othUser.nombre);

      chat
        .child(this.yourUser.uid + "-" + othUser.uid + "/photo")
        .set(othUser.photo);
      chat
        .child(this.yourUser.uid + "-" + othUser.uid + "/uid")
        .set(othUser.uid);

      let othChat = db
        .ref()
        .child("users")
        .child(othUser.uid)
        .child("rooms");

      othChat
        .child(this.yourUser.uid + "-" + othUser.uid + "/name")
        .set(this.yourUser.nombre);

      othChat
        .child(this.yourUser.uid + "-" + othUser.uid + "/photo")
        .set(this.yourUser.photo);
      othChat
        .child(this.yourUser.uid + "-" + othUser.uid + "/uid")
        .set(this.yourUser.uid);

      this.drawer = false;
      this.chatCreated();
    },
    chatCreated() {
      db.ref("users")
        .child(this.uid)
        .child("rooms")
        .on("value", data => {
          this.rooms = Object.values(data.val());
        });
      console.log(this.rooms);
    },
    changeRoom(index) {
      this.othUid = this.rooms[index].uid;
      console.log(this.othUid);
      this.getMessage();
    },
    sendMessage() {
      let today = new Date();
      let date =
        "[" +
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getFullYear() +
        ", " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        "]";
      let obj = {
        message: this.text,
        uid: this.uid,
        date: date
      };
      console.log(this.othUid);

      db.ref("chats/" + this.uid + "-" + this.othUid + "/").push(obj);
      this.text = "";
    },
    getMessage() {
      db.ref("chats/" + this.uid + "-" + this.othUid).on("value", data => {
        this.messages = Object.values(data.val());
      });
    },
    scrollToEnd() {
      // Allows to show always the last message sent when you enter the room.
      document.getElementById("scrollable").scrollTop = document.getElementById(
        "scrollable"
      ).scrollHeight;
    },
    deleteChat(index) {
      db.ref("users")
        .child(this.uid)
        .child("rooms")
        .child(this.uid + "-" + this.othUid)
        .remove();
      let aux = [];
      let a = 0;
      for (let i = 0; i < this.rooms.length; i++) {
        if (index != i) {
          aux[a] = this.rooms[i];
          a++;
        }
      }
      this.rooms = aux;
      this.messages = "";
    }
  }
};
</script>

<style scoped>
.v-btn--outlined {
  border-width: 4px;
}

.v-btn-outlined-exception {
  border-width: 1px;
  border-radius: 15px;
}

.scrollbar {
  overflow: auto;
}
</style>
