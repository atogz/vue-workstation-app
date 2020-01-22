import router from "../router/index";
import store from "../store/index";

//guard middleware

export default function setup() {
  router.beforeEach((to, from, next) => {
    if (to.path !== "/login") {
      if(!store.getters.isAuthorized) {
        next('/login');
      }
    } else next();
  });
}
