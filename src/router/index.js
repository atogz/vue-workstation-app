import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Projects from "../views/Projects";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Projects
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/projects",
    component: Projects
  }
];

const router = new VueRouter({
  routes
});

export default router;
