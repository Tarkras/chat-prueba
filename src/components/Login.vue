<template>
  <v-layout fill-height>
    <!-- **Here is a simple card with the google login button** -->
    <v-container align-center justify-center fill-height>
      <v-layout column justify-center align-center>
        <v-card width="300" height="300" fixed flat outlined color="grey lighten-2">
          <v-row style="height: 100%">
            <v-col>
              <v-layout justify-center>
                <v-card-title>
                  <span class="headline font-weight-medium">Log In with Google</span>
                </v-card-title>
              </v-layout>
              <v-layout justify-center>
                <v-divider class="mx-4"></v-divider>
              </v-layout>
              <v-row style="height: 244px" align="center" no-gutters>
                <v-col>
                  <v-row justify="center">
                    <v-btn fab x-large class="v-btn-google" v-on:click="loginGoogle">
                      <v-icon></v-icon>
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { db, au, fr } from "../db";
export default {
  components: {
    //
  },
  data() {
    return {
      uid: "",
      photo: "",
      nombre: ""
    };
  },
  firebase: {
    user: db.ref("users")
  },
  methods: {
    loginGoogle() {
      // Login with google.
      let provider = new fr.auth.GoogleAuthProvider();
      au.signInWithPopup(provider).then(() => {
        this.$store.commit("setComponent", "app-logged");
        this.uid = au.currentUser.uid;
        this.photo = au.currentUser.photoURL;
        this.nombre = au.currentUser.displayName;
        let users = this.$firebaseRefs.user;
        users.child(this.uid + "/photo").set(this.photo);
        users.child(this.uid + "/uid").set(this.uid);
        users.child(this.uid + "/nombre").set(this.nombre);
        this.$store.commit("setUid", this.uid);
        this.$emit("logged", "app-logged");
      });
    }
  }
};
</script>

<style scoped>
.v-btn-google {
  background-image: url("../assets/logo_google.png");
  background-size: cover;
}
</style>
