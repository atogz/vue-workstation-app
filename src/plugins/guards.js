import router from "../router/index";
import store from "../store/index";

//guard middleware

export default function setup() {
  console.log("setup guards done");
  router.beforeEach((to, from, next) => {
    if (to.path !== "/login") {
      if (store.getters.isAuthorized) {
        next();
      } else {
        next("/login");
      }
    } else {
      if (store.getters.isAuthorized && to.path === "/login") {
        next("/projects");
      } else {
        next();
      }
    }
  });
}
