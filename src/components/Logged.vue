<template>
  <v-layout align-center justify-center>
    <v-container fill-height>
      <!-- ** Main card. Contains the other elements. **-->
      <v-card width="100%" height="540px">
        <v-row no-gutters>
          <v-col cols="12">
            <v-app-bar light class="grey lighten-1">
              <v-row>
                <!-- ** Create chat button and your account image. **-->
                <v-col cols="3" class="column-border">
                  <v-btn fab small>
                    <v-avatar size="40">
                      <v-img :src="yourUser.photo"></v-img>
                    </v-avatar>
                  </v-btn>
                  <v-btn @click="handler" class="ml-3">
                    <v-icon left>mdi-message-text</v-icon>Create chat
                  </v-btn>
                </v-col>

                <!-- ** Shows with whom you are chatting. **-->
                <v-col cols="9">
                  <v-row v-if="othUser != null">
                    <v-avatar size="40" class="ml-3">
                      <v-img :src="othUser.photo"></v-img>
                    </v-avatar>
                    <span class="ml-2 mt-2 font-weight-bold">
                      {{ othUser.name }}
                    </span>
                  </v-row>
                </v-col>
              </v-row>
            </v-app-bar>
          </v-col>
          <v-col cols="3" class="pa-0">
            <!-- ** This card shows the current chats that you have. ** -->
            <!-- ** Here you can change between chats and delete the chat. **-->
            <v-card
              height="476px"
              class="scrollbar grey lighten-4"
              max-height="100%"
            >
              <v-list
                class="py-0 grey lighten-4"
                v-for="(room, index) in rooms"
                :key="index"
              >
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
            <!-- ** 
            Here the messages with whom you are talking will be displayed. **-->
            <v-card
              height="396px"
              class="grey lighten-3 scrollbar"
              id="scrollable"
            >
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
                        <v-img v-else :src="othUser.photo"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="pr-5" cols="11">
                      <v-row>
                        <span
                          class="font-weight-bold"
                          v-if="yourUser.uid == message.uid"
                          >{{ yourUser.nombre }}</span
                        >
                        <span class="font-weight-bold" v-else>
                          {{ othUser.name }}
                        </span>
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
                <v-divider class="mx-3"></v-divider>
              </div>
            </v-card>
            <!-- ** This card allows you to send messages. **-->
            <v-card height="80px" class="grey lighten-1">
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
                    <v-btn fab @click="sendMessage">
                      <v-img src="../assets/send.svg"></v-img>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <!-- **This is the list with the people that have an account in the web. **-->
      <!-- ** This list will be shown when you click the create chat button. **-->
      <!-- ** In order to create the chat you have to click the Create button for the person in the list.** -->
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
        <v-list
          class="py-0 scrollbar"
          v-for="(user, index) in otherUsers"
          :key="user.uid"
        >
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
      chatting: "Chatting with:",
      drawer: false,
      dbUsers: "",
      yourUser: "",
      otherUsers: [],
      rooms: "",
      uid: "",
      text: "",
      othUser: "",
      messages: "",
      yourMessage: ""
    };
  },
  firebase: {
    user: db.ref("users"),
    chats: db.ref("chats")
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
      // Users that have created an account in the web.
      // Shows a list in a drawer that you can open when you
      // click in the Create Chat button.
      let yourUser = this.uid;
      this.$firebaseRefs.user.on("value", data => {
        this.dbUsers = Object.values(data.val());
      });

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
    },
    createChat(index) {
      // In the drawer when you click on the button Create
      // it will create a chat room with the person that
      // you want to talk to.
      let othUser = this.otherUsers[index];

      // It creates two "different" chat rooms, one for you and
      // the other for the other person. In this way, when you
      // delete the chat the other person still has the chat room
      // with all the messages. In the eyes of the user, it seems
      // like it is one chat.
      let chat = this.$firebaseRefs.user
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

      let othChat = this.$firebaseRefs.user.child(othUser.uid).child("rooms");

      othChat
        .child(othUser.uid + "-" + this.yourUser.uid + "/name")
        .set(this.yourUser.nombre);

      othChat
        .child(othUser.uid + "-" + this.yourUser.uid + "/photo")
        .set(this.yourUser.photo);
      othChat
        .child(othUser.uid + "-" + this.yourUser.uid + "/uid")
        .set(this.yourUser.uid);

      this.drawer = false;
      this.chatCreated();
    },
    chatCreated() {
      // This function pulls out your rooms to display it on the
      // page.
      this.$firebaseRefs.user
        .child(this.uid)
        .child("rooms")
        .on("value", data => {
          this.rooms = Object.values(data.val());
        });
    },
    changeRoom(index) {
      // This functions allows you to change to another chat room.
      this.othUser = this.rooms[index];
      this.getMessage();
    },
    sendMessage() {
      // Writes the message in the database.
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

      if (this.text != "") {
        this.$firebaseRefs.chats
          .child(this.uid + "-" + this.othUser.uid + "/")
          .push(obj);
        this.$firebaseRefs.chats
          .child(this.othUser.uid + "-" + this.yourUser.uid + "/")
          .push(obj);
      } else {
        return;
      }
      this.text = "";

      // This part creates the room for the other person if this person has deleted the chat and you sent a message afterwards.
      let othChat = this.$firebaseRefs.user
        .child(this.othUser.uid)
        .child("rooms");

      othChat
        .child(this.othUser.uid + "-" + this.yourUser.uid + "/name")
        .set(this.yourUser.nombre);

      othChat
        .child(this.othUser.uid + "-" + this.yourUser.uid + "/photo")
        .set(this.yourUser.photo);
      othChat
        .child(this.othUser.uid + "-" + this.yourUser.uid + "/uid")
        .set(this.yourUser.uid);
    },
    getMessage() {
      this.$firebaseRefs.chats
        .child(this.uid + "-" + this.othUser.uid + "/")
        .on("value", data => {
          this.messages = Object.values(data.val());
        });
    },
    scrollToEnd() {
      // Allows to show always the last message sent when
      // you enter the room.
      document.getElementById("scrollable").scrollTop = document.getElementById(
        "scrollable"
      ).scrollHeight;
    },
    deleteChat(index) {
      // It deletes the chat room and the messages only for you.
      // The other person still has the messages.
      let aux = [];
      let a = 0;
      for (let i = 0; i < this.rooms.length; i++) {
        if (index != i) {
          aux[a] = this.rooms[i];
          a++;
        }
        if (index == i) {
          let removeId = this.rooms[i].uid;
          this.$firebaseRefs.user
            .child(this.uid)
            .child("rooms")
            .child(this.uid + "-" + removeId)
            .remove();
          this.$firebaseRefs.chats.child(this.uid + "-" + removeId).remove();
        }
      }
      this.rooms = aux;
      this.messages = "";
      this.othUser = "";
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

.column-border {
  border-right: solid;

  border-width: 1px;
  color: dimgray;
}
</style>
