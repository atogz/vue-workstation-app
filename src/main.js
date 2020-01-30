import Vue from "vue";
import axios from "./plugins/api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";

//mock api
import { Server } from "miragejs";
const server = new Server();

server.post("/api/auth/login", (schema, request) => {
  let attrs = JSON.parse(request.requestBody);
  if (attrs.username === "ivan.ivanov" && attrs.password === "12345") {
    return {
      success: true,
      token: "12351523412312",
      user: {
        name: "ivan",
        surname: "ivanov"
      }
    };
  } else {
    return {
      success: false,
      error: "Неверный логин или пароль"
    };
  }
});

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
