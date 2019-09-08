import "./db";

import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "firebase/auth";

import { rtdbPlugin } from "vuefire";
import { au } from "./db";

Vue.use(rtdbPlugin);
Vue.config.productionTip = false;

au.onAuthStateChanged(user => {
  if (user) {
    store.commit("setComponent", "app-logged");
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  } else {
    store.commit("setComponent", "app-login");
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
