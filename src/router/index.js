import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue")
  }
];

const router = new VueRouter({
  routes
});

//guard middleware
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    if (!store.getters.isAuthorized) {
      next("/login");
    }
  } else next();
});

export default router;
