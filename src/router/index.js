import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Projects from "../views/Projects";
import Project from "../views/Project";

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
  },
  {
    path: "/projects/:id",
    name: "project",
    props: true,
    component: Project
  }
];

const router = new VueRouter({
  routes
});

export default router;
