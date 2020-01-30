import Vue from "vue";
import axios from "axios";

const instance = axios.create({
  //for real api
  // baseURL: "http://b8n.ru:7788/v1"

  //for mirage
  baseURL: "/api"
});

Vue.prototype.$axios = instance;

export default instance;
