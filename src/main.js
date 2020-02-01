import Vue from "vue";
import axios from "./plugins/api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

//mock api
import "./mirage/server";

//helpers
import interceptorsSetup from "./plugins/interceptors";
import guardsSetup from "./plugins/guards";

interceptorsSetup();
store.dispatch("APP_LOADED").then(() => {
  guardsSetup();

  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    axios,
    render: h => h(App)
  }).$mount("#app");
});
