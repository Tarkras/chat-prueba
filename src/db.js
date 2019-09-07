import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA4bPppeIycaS__7LCyK3989h8yExJ2ar8",
  authDomain: "prueba-chat-didac-ortega.firebaseapp.com",
  databaseURL: "https://prueba-chat-didac-ortega.firebaseio.com",
  projectId: "prueba-chat-didac-ortega",
  storageBucket: "",
  messagingSenderId: "857260690581",
  appId: "1:857260690581:web:c9106c31700ec00d4ddf9c"
});

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();
