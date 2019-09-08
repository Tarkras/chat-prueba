<template>
  <v-layout fill-height>
    <component :is="component" @logged="logged"></component>
  </v-layout>
</template>

<script>
import Login from "../components/Login";
import Logged from "../components/Logged";

export default {
  components: {
    "app-login": Login,
    "app-logged": Logged
  },
  created() {
    this.component = this.$store.getters.getComponent;
  },
  data() {
    return {
      component: ""
    };
  },
  methods: {
    logged(value) {
      this.component = value;
    }
  }
};
</script>
