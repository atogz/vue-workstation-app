import Vue from "vue";
import axios from "./plugins/api";
import App from "./App.vue";

import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import VueLoading from "vuejs-loading-plugin";

//mock api
import "./mirage/server";

//helpers
import interceptorsSetup from "./plugins/interceptors";
import guardsSetup from "./plugins/guards";
import Loader from "./components/Loader";

//directives
Vue.use(VueLoading, {
  text: "Загрузка",
  customLoader: Loader
});

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
