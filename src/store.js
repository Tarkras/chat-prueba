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
        },
        getUsers(state) {
            return state.users;
        },
        getUid(state) {
            return state.uid;
        }
    },
    mutations: {
        setComponent(state, value) {
            state.component = value;
        },
        setUsers(state, value) {
            state.users = value;
        },
        setUid(state, value) {
            state.uid = value;
        }
    },
    actions: {}
});