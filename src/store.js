import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    component: "app-login",
    users: [],
    uid: ""
  },
  getters: {
    getComponent(state) {
      return state.component;
    }
  },
  mutations: {
    setComponent(state, value) {
      state.component = value;
    }
  },
  actions: {}
});
