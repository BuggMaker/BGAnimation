import Vue from "vue";

import * as Coms from "./components/index";

Object.keys(Coms).forEach(key => {
  Vue.component(key, Coms[key]);
});

import app from "./app";
new Vue({
  el: "#app",
  components: { app }
});
