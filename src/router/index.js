import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

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

export default router;
