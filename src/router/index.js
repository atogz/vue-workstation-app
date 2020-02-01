import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },

  {
    path: "/dashboard",
    component: Dashboard
  },

];

const router = new VueRouter({
  routes
});

export default router;
